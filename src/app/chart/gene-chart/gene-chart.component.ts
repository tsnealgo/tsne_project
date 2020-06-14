import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as tSNE from '../../../assets/tSNE.json';
import convert_table from '../../../assets/convert.json';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gene-chart',
  templateUrl: './gene-chart.component.html',
  styleUrls: ['./gene-chart.component.css'],
})

export class GeneChartComponent implements OnInit {

  convert: any = convert_table.convert;
  tSNE_data = tSNE.results;
  @Input() selectedGene: string;
  

  constructor(private httpClient: HttpClient){}

    ngOnChanges(changes: SimpleChanges){
      this.bubbleChartData[0].data = this.generateDataByGene("Six2_neg");
      this.bubbleChartData[1].data = this.generateDataByGene("Six2_pos"); 
  }

  ngOnInit(): void {}
  
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
    elements: {
      point: {
        hoverRadius: 1,
      }
    }
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
    let gene;
    let x, y, r, name;
    if(this.selectedGene != "none"){
      let index = this.convert.filter(element => element.gene == this.selectedGene)[0].index;
      this.httpClient.get(`https://bioprojectbiuserver.firebaseio.com/genes/genes/${index}.json`).toPromise()
      .then( result => {
            gene = result;
            for(let i = 0; i < this.tSNE_data.length; i++) {
            if (FACS_gate == this.tSNE_data[i].FACS_gate){
              x = Number(this.tSNE_data[i].tSNE_X);
              y = Math.floor(Number(this.tSNE_data[i].tSNE_Y));
              name = this.tSNE_data[i].Cell_name;
              let temp = Object.getOwnPropertyDescriptor(gene, name);
              r = temp.value;
            }            
            data.push({x, y, r}); 
            }});
    }
    else
      data = this.generateData(FACS_gate);
  
    return data;
    }

  downloadImage(event){
    let anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
    anchor.download = `${this.selectedGene}_families1.png`;
  }
}