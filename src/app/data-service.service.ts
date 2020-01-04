import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private selectedGeneSource = new BehaviorSubject<string>("none");
  currentSelectedGene = this.selectedGeneSource.asObservable();

  constructor() { }

  changeSelectedGene(selectedGene: string) {
    this.selectedGeneSource.next(selectedGene);
  }
}
