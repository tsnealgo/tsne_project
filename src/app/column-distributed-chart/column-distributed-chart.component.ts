import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as dist from '../../assets/dist_genes.json';


@Component({
  selector: 'app-column-distributed-chart',
  templateUrl: './column-distributed-chart.component.html',
  styleUrls: ['./column-distributed-chart.component.css']
})
export class ColumnDistributedChartComponent implements OnInit {

  @Input() selectedGene: string;
  dist_data: any = (dist as any).default.results;

  constructor() { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels = ['UM', 'CM_ALL', 'CM_DIV', 'PODO', 'PROX_1', 'PROX_2', 'LOH', 'DIST_CD', 'ENDO', 'MACROPHAG'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {
      backgroundColor: '#234057',
      hoverBackgroundColor:'#234057',
      borderColor: 'black',
      borderWidth: 0.4,
      label: '',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges){
    this.barChartData[0].data = this.generateDataByGene();
    this.barChartData[0].label = this.selectedGene;
  }

  public findGene(geneName: string){
    return this.dist_data.filter(element => element.gene === geneName);
  }

  generateDataByGene(){
    let data = [];

    if(this.selectedGene != "none"){
      let output = this.findGene(this.selectedGene);
      data = Object.values(output[0]);
      data = data.slice(1, data.length);
    } else
      data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    return data;
  }

  downloadImage(event){
    let anchor = event.target;
    anchor.href = document.getElementsByTagName('canvas')[2].toDataURL();
    anchor.download = `${this.selectedGene}_bar.png`;
  }
}
