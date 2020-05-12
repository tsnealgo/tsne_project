import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnDistributedChartComponent } from './column-distributed-chart.component';

describe('ColumnDistributedChartComponent', () => {
  let component: ColumnDistributedChartComponent;
  let fixture: ComponentFixture<ColumnDistributedChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnDistributedChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnDistributedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
