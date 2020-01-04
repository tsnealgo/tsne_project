import { DataService } from './data-service.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedGene: string = "none";

  constructor(private data: DataService) { }
  
  ngOnInit() {
    this.data.currentSelectedGene.subscribe(selectedGene => this.selectedGene = selectedGene)
  }
}
