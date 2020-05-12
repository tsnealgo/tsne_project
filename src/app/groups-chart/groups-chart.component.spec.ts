import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsChartComponent } from './groups-chart.component';

describe('GroupsChartComponent', () => {
  let component: GroupsChartComponent;
  let fixture: ComponentFixture<GroupsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
