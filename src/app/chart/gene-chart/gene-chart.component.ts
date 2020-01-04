
import { DataService } from './../../data-service.service';
import { Cell } from './cell.module';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartTooltipOptions, ChartData } from 'chart.js';
import * as tSNE from '../../../assets/tSNE.json';
import * as normalized from '../../../assets/normalized_genes.json';

@Component({
  selector: 'app-gene-chart',
  templateUrl: './gene-chart.component.html',
  styleUrls: ['./gene-chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneChartComponent implements OnInit {

  tSNE_data = tSNE.results;
  genesVScells = normalized.results;
  cells = [];
  dynamic_cells = [];
  selectedGene: string = "none";
  geneCells: any;
  
  constructor(private data: DataService){}

  ngOnInit(): void {

    for(let i = 0; i < this.tSNE_data.length; i++) {
      let cell = new Cell();
      cell.x = Number(this.tSNE_data[i].tSNE_X);
      cell.y = Number(this.tSNE_data[i].tSNE_Y);
      cell.r = this.bubbleDefaultRadius;
      cell.cellName = this.tSNE_data[i].Cell_name;
      cell.FACS_gate = this.tSNE_data[i].FACS_gate;
      this.cells.push(cell);
    }
    this.InitializingData(this.cells);

     this.data.currentSelectedGene.subscribe(selectedGene => {
       console.log("into subscrice", selectedGene);
       this.selectedGene = selectedGene;  
       console.log("into subscrice",  this.selectedGene); 
    //   if(this.selectedGene !== "none") {
    //     this.dynamic_cells = this.cells;
    //     this.bubbleChartData[0].data = this.dynamic_cells;
    //     this.geneCells = this.findGene(this.selectedGene);
    //     this.cells.forEach(cell => {
    //       if(this.geneCells.hasOwnProperty(cell.cellName)) {
    //         if (this.geneCells[cell.cellName] == 0){
    //           let index = this.dynamic_cells.indexOf(cell);
    //           if (index != -1)
    //            this.dynamic_cells.splice(index,1);
    //         }   
    //         else {
    //           cell.r = Math.round(this.geneCells[cell.cellName]*20);
    //         }
    //       }
    //     });
    //     this.bubbleChartData[0].backgroundColor = '#AA3939';
    //     this.bubbleChartData[0].data = this.dynamic_cells; 
    //   } 
    //   else {
    //     this.bubbleChartData[0].data = this.cells; 
    //     this.bubbleChartData[0].backgroundColor = '#306262';
    //   }  
     });
      
  }
  /*search the selected gene from the original table*/
  public findGene(geneName: string){
    return this.genesVScells.find( element => element.gene === geneName);
  }
  /*update the data var in ChartDataSets */
  public InitializingData(new_data: Cell[]){
    this.bubbleChartData[0].data = new_data;
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
  public bubblesTooltip: ChartTooltipOptions;
  bubbleDefaultRadius: number = 4;

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
