import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-gene-menu',
  templateUrl: './gene-menu.component.html',
  styleUrls: ['./gene-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneMenuComponent implements OnInit {
  
  @Input() selectedGeneDensity: number = 10;
  @Input() selectedGene: string;
  @Input() genesDensity: number = 10;

  constructor() { }

  ngOnInit() {
  }  

}
