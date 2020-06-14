import { element } from 'protractor';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets, ChartTooltipOptions } from 'chart.js';
import * as tSNE from '../../assets/tSNEByGroups.json';
import { HttpClient } from '@angular/common/http';
import convert_table from '../../assets/convert.json';

@Component({
  selector: 'app-groups-chart',
  templateUrl: './groups-chart.component.html',
  styleUrls: ['./groups-chart.component.css']
})
export class GroupsChartComponent implements OnInit {

  tSNE_data = tSNE.results;
  @Input() selectedGene: string;
  convert: any = convert_table.convert;
  

  constructor(private httpClient: HttpClient){}

    ngOnChanges(changes: SimpleChanges){
      this.bubbleChartData[0].data = this.generateDataByGene("UM"); 
      this.bubbleChartData[1].data = this.generateDataByGene("CM_ALL"); 
      this.bubbleChartData[2].data = this.generateDataByGene("CM_DIV"); 
      this.bubbleChartData[3].data = this.generateDataByGene("PODO"); 
      this.bubbleChartData[4].data = this.generateDataByGene("PROX_1"); 
      this.bubbleChartData[5].data = this.generateDataByGene("PROX_2"); 
      this.bubbleChartData[6].data = this.generateDataByGene("LOH"); 
      this.bubbleChartData[7].data = this.generateDataByGene("DIST_CD");  
      this.bubbleChartData[8].data = this.generateDataByGene("ENDO");
      this.bubbleChartData[9].data = this.generateDataByGene("MACROPHAG");
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

  public bubblesTooltip: ChartTooltipOptions = {}
  
  bubbleDefaultRadius: number = 5;

  public bubbleChartData: ChartDataSets[] = [
    {
      backgroundColor: '#FEB019',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'UM',
      data: this.generateData("UM")
    },
    {
      backgroundColor: '#f3b7d0',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'CM_ALL',
      data: this.generateData("CM_ALL")
    },
    {
      backgroundColor: '#775DD0',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'CM_DIV',
      data: this.generateData("CM_DIV")
    },
    {
      backgroundColor: '#546E7A',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'PODO',
      data: this.generateData("PODO")
    },
    {
      backgroundColor: '#26a69a',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'PROX_1',
      data: this.generateData("PROX_1")
    },
    {
      backgroundColor: '#9aa0a5	',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'PROX_2',
      data: this.generateData("PROX_2")
    },
    {
      backgroundColor: '#5e3c58	',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'LOH',
      data: this.generateData("LOH")
    },
    {
      backgroundColor: '#234057',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'DIST_CD',
      data: this.generateData("DIST_CD")
    },
    {
      backgroundColor: '#99da50	',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'ENDO',
      data: this.generateData("ENDO")
    },
    {
      backgroundColor: '#8ecfe5',
      borderColor: 'black',
      borderWidth: 0.4,
      label: 'MACROPHAG',
      data: this.generateData("MACROPHAG")
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
    anchor.href = document.getElementsByTagName('canvas')[1].toDataURL();
    anchor.download = `${this.selectedGene}_families2.png`;
  }

}
