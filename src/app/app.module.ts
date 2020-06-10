import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GeneSelectComponent } from './gene-select/gene-select.component'
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneChartComponent } from './chart/gene-chart/gene-chart.component';
import { ChartsModule } from 'ng2-charts';
import { ColumnDistributedChartComponent } from './column-distributed-chart/column-distributed-chart.component';
import { GroupsChartComponent } from './groups-chart/groups-chart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    GeneSelectComponent,
    GeneChartComponent,
    ColumnDistributedChartComponent,
    GroupsChartComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxSelectModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
