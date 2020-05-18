import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as tSNE from '../../../assets/tSNE.json';
import * as Genes from '../../../assets/2KGenes.json';
@Component({
  selector: 'app-gene-chart',
  templateUrl: './gene-chart.component.html',
  styleUrls: ['./gene-chart.component.css'],
})

export class GeneChartComponent implements OnInit {

  tSNE_data = tSNE.results;
  genesVScells: any = (Genes as any).default.results;
  @Input() selectedGene: string;
  

  constructor(){}

    ngOnChanges(changes: SimpleChanges){
      this.bubbleChartData[0].data = this.generateDataByGene("Six2_neg");
      this.bubbleChartData[1].data = this.generateDataByGene("Six2_pos");  
  }

  ngOnInit(): void {
  }


  /*search the selected gene from the original table*/
  public findGene(geneName: string){
    return this.genesVScells.filter(element => element.gene === geneName);
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
      display: true,
    },

    // tooltips: {
    //   enabled: true,
    //   mode: 'point',
    // callbacks: {
    //   title: function (tooltipItem, data){
    //     return "Info:";
    //   },
    //   label: function (tooltipItem, data){
    //     let family = data.datasets[tooltipItem.datasetIndex].label || '';
    //     return family;
    //   }
    // }
    // }
  };

  public bubbleChartType: ChartType = 'bubble';

  public bubbleChartData: ChartDataSets[] = [
    {
      backgroundColor: '#9aa0a5',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'Six2_neg',
      data: this.generateData("Six2_neg")
    },
    {
      backgroundColor: '#8ecfe5',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'Six2_pos',
      data: this.generateData("Six2_pos")
    },
  ];

  ngOnDestroy(){}

  public generateData(FACS_gate: string) {
    let data = [];
    let x, y, r;
    for(let i = 0; i < this.tSNE_data.length; i++) {
      if (FACS_gate == this.tSNE_data[i].FACS_gate){
        x = Number(this.tSNE_data[i].tSNE_X);
        y = Math.floor(Number(this.tSNE_data[i].tSNE_Y));
        r = 7;  
        data.push({x, y, r}); 
      }   
    }
    return data;
  }

  public generateDataByGene(FACS_gate: string) {
    let data = [];
    let geneCells = [];
    let x, y, r, name;
    for(let i = 0; i < this.tSNE_data.length; i++) {
      if (FACS_gate == this.tSNE_data[i].FACS_gate){
        x = Number(this.tSNE_data[i].tSNE_X);
        y = Math.floor(Number(this.tSNE_data[i].tSNE_Y));
        name = this.tSNE_data[i].Cell_name;
        if(this.selectedGene == "none")
          r = 7;  
        else {
          geneCells = this.findGene(this.selectedGene);
          let temp = Object.getOwnPropertyDescriptor(geneCells[0], name);
          r = temp.value;
        }            
        data.push({x, y, r}); 
      }   
    }
    return data;
  }
}