import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneSelectComponent } from './gene-select.component';

describe('GeneSelectComponent', () => {
  let component: GeneSelectComponent;
  let fixture: ComponentFixture<GeneSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
