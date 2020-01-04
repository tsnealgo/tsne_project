import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneMenuComponent } from './gene-menu.component';

describe('GeneMenuComponent', () => {
  let component: GeneMenuComponent;
  let fixture: ComponentFixture<GeneMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
