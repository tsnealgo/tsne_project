import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GeneSelectComponent } from './menu/components/gene-select/gene-select.component';
import { NgxSelectModule } from 'ngx-select-ex';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneMenuComponent } from './menu/components/gene-menu/gene-menu.component';
import { GeneChartComponent } from './chart/gene-chart/gene-chart.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    GeneSelectComponent,
    GeneMenuComponent,
    GeneChartComponent,

    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxSelectModule,
    ReactiveFormsModule,
    ChartsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
