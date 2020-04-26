import { DataService } from './../../data-service.service';
import { Cell } from './cell.module';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartTooltipOptions, ChartData } from 'chart.js';
import * as tSNE from '../../../assets/tSNE.json';
import * as Genes from '../../../assets/2KGenes.json';

@Component({
  selector: 'app-gene-chart',
  templateUrl: './gene-chart.component.html',
  styleUrls: ['./gene-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneChartComponent implements OnInit {

  tSNE_data = tSNE.results;
  genesVScells: any = (Genes as any).default.results;

  cells = [];
  dynamic_cells = [];
  selectedGene: string = "none";s
  geneCells: any;
  

  chart = null;

  constructor(private data: DataService, private ref: ChangeDetectorRef){}

  ngOnInit(): void {
    console.log("XXX",  this.genesVScells);
    this.Initializing_tSNE();
    this.updateData(this.cells);

    //change in selectedGene
     this.data.currentSelectedGene.subscribe(selectedGene => {
        this.selectedGene = selectedGene;  
        //return this.cells to the origin value
        this.Initializing_tSNE();
        //if the user chose a gene
      if(this.selectedGene !== "none") {
        this.dynamic_cells = this.cells;
        this.geneCells = this.findGene(this.selectedGene);
        this.dynamic_cells.forEach(cell => {
          if(this.geneCells[0].hasOwnProperty(cell.cellName)){
            cell.r = Number(this.geneCells[0][cell.cellName]);
          }
        });
        this.bubbleChartData[0].backgroundColor = '#306262';
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
  public bubblesTooltip: ChartTooltipOptions ={
    intersect: true,

    }
  bubbleDefaultRadius: number = 5;

  public bubbleChartData: ChartDataSets[] = [
    {
      backgroundColor: '#306262',
      borderColor: 'black',
      borderWidth: 0.4,
    },
  ];

  ngOnDestroy(){}


}