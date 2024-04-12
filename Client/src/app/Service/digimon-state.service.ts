import { Injectable, WritableSignal, signal } from '@angular/core';
import { Digimon } from '../digimon';

@Injectable({
  providedIn: 'root'
})
export class DigimonStateService {
  digimonsData: WritableSignal<Digimon[]> = signal([]);

  constructor() { }

  setData(data: any[]) {
    this.digimonsData.set(data);
  }

  getData(): any {
    return this.digimonsData()
  }
}

