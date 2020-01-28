import { element } from 'protractor';

import { DataService } from './../../data-service.service';
import { Cell } from './cell.module';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartTooltipOptions, ChartData } from 'chart.js';
import * as tSNE from '../../../assets/tSNE.json';
import * as normalized from '../../../assets/1000Genes.json';

@Component({
  selector: 'app-gene-chart',
  templateUrl: './gene-chart.component.html',
  styleUrls: ['./gene-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneChartComponent implements OnInit {

  tSNE_data = tSNE.results;
  genesVScells: any = (normalized as any).default.results;
  cells = [];
  dynamic_cells = [];
  selectedGene: string = "none";
  geneCells: any;
  
  constructor(private data: DataService, private ref: ChangeDetectorRef){}

  ngOnInit(): void {
    this.Initializing_tSNE();
    this.updateData(this.cells);

    //change in selectedGene
     this.data.currentSelectedGene.subscribe(selectedGene => {
      let countIn = 0, countOut = 0, count = 0;
        this.selectedGene = selectedGene;  
        //return this.cells to the origin value
        this.Initializing_tSNE();
        //if the user chose a gene
      if(this.selectedGene !== "none") {
        this.dynamic_cells = this.cells;
        this.geneCells = this.findGene(this.selectedGene);
        this.dynamic_cells.forEach(cell => {
          if(this.geneCells[0].hasOwnProperty(cell.cellName)){
            //   if(this.geneCells[0][cell.cellName] != 0){
            //   if(this.geneCells[0][cell.cellName] < 0.1)
            //     cell.r = 3.2;
            //   else if(this.geneCells[0][cell.cellName] < 0.2) 
            //     cell.r = 3.9;
            //   else if(this.geneCells[0][cell.cellName] < 0.3) 
            //     cell.r = 4.5;
            //   else if(this.geneCells[0][cell.cellName] < 0.4) 
            //     cell.r = 5;
            //   else if(this.geneCells[0][cell.cellName] < 0.7) 
            //     cell.r = 5.7;
            //   else if(this.geneCells[0][cell.cellName] < 1) 
            //     cell.r = 6.5;
            // }
            // else{
            //   cell.r = 0;
            // }
            cell.r = Number(this.geneCells[0][cell.cellName])*20;
          }
        });
        this.bubbleChartData[0].backgroundColor = '#AA3939';
        this.updateData(this.dynamic_cells);
      } 
      else {
        this.updateData(this.cells);
        this.bubbleChartData[0].backgroundColor = '#306262';
      }  
      this.ref.markForCheck();
     });
      
  }
  /*search the selected gene from the original table*/
  public findGene(geneName: string){
    return this.genesVScells.filter(element => element.gene === geneName);
  }
  /*update the data var in ChartDataSets */
  public updateData(new_data: Cell[]){
    this.bubbleChartData[0].data = new_data;
  }
  
  // initialize cells from tSNE JSON
  public Initializing_tSNE(){
    this.cells = [];
    for(let i = 0; i < this.tSNE_data.length; i++) {
      let cell = new Cell();
      cell.x = Number(this.tSNE_data[i].tSNE_X);
      cell.y = Number(this.tSNE_data[i].tSNE_Y);
      cell.r = this.bubbleDefaultRadius;
      cell.cellName = this.tSNE_data[i].Cell_name;
      cell.FACS_gate = this.tSNE_data[i].FACS_gate;
      this.cells.push(cell);
    }
  }
  
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      zoom: {
        // Container for pan options
        pan: {
          // Boolean to enable panning
          enabled: true,
    
          // Panning directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow panning in the y direction
          // A function that is called as the user is panning and returns the
          // available directions can also be used:
          //   mode: function({ chart }) {
          //     return 'xy';
          //   },
          mode: 'xy',
    
          rangeMin: {
            // Format of min pan range depends on scale type
            x: null,
            y: null
          },
          rangeMax: {
            // Format of max pan range depends on scale type
            x: null,
            y: null
          },
    
          // Function called while the user is panning
          onPan: function({chart}) { console.log(`I'm panning!!!`); },
          // Function called once panning is completed
          onPanComplete: function({chart}) { console.log(`I was panned!!!`); }
        },
    
        // Container for zoom options
        zoom: {
          // Boolean to enable zooming
          enabled: true,
    
          // Enable drag-to-zoom behavior
          drag: true,
    
          // Drag-to-zoom effect can be customized
          // drag: {
          // 	 borderColor: 'rgba(225,225,225,0.3)'
          // 	 borderWidth: 5,
          // 	 backgroundColor: 'rgb(225,225,225)',
          // 	 animationDuration: 0
          // },
    
          // Zooming directions. Remove the appropriate direction to disable
          // Eg. 'y' would only allow zooming in the y direction
          // A function that is called as the user is zooming and returns the
          // available directions can also be used:
          //   mode: function({ chart }) {
          //     return 'xy';
          //   },
          mode: 'xy',
    
          rangeMin: {
            // Format of min zoom range depends on scale type
            x: null,
            y: null
          },
          rangeMax: {
            // Format of max zoom range depends on scale type
            x: null,
            y: null
          },
    
          // Speed of zoom via mouse wheel
          // (percentage of zoom on a wheel event)
          speed: 0.1,
    
          // Function called while the user is zooming
          onZoom: function({chart}) { console.log(`I'm zooming!!!`); },
          // Function called once zooming is completed
          onZoomComplete: function({chart}) { console.log(`I was zoomed!!!`); }
        }
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          min: -60,
          max: 60,
        }
      }],

      yAxes: [{
        ticks: {
          min: -60,
          max: 60,
        }
      }]
    },
    legend: {
      display: false
    },
  };

  public bubbleChartType: ChartType = 'bubble';
  public bubblesTooltip: ChartTooltipOptions;
  bubbleDefaultRadius: number = 5;

  public bubbleChartData: ChartDataSets[] = [
    {
      backgroundColor: '#306262',
      borderColor: 'black',
      borderWidth: 0.4,
    },
  ];

  ngOnDestroy(){
  }


}
