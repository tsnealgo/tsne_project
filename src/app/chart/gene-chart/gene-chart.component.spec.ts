import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneChartComponent } from './gene-chart.component';

describe('GeneChartComponent', () => {
  let component: GeneChartComponent;
  let fixture: ComponentFixture<GeneChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
