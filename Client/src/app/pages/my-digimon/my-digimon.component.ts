import {
  Component,
  DestroyRef,
  OnInit,
  WritableSignal,
  computed,
  effect,
  signal,
} from '@angular/core';
import { DigimonService } from '../../service/digimon.service';
import { Digimon } from '../../digimon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

import { FormComponent } from '../../components/form/form.component';
import { DigimonStateService } from '../../service/digimon-state.service';

@Component({
  selector: 'app-my-digimon',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PageHeaderComponent, FormComponent],
  templateUrl: './my-digimon.component.html',
  styleUrl: './my-digimon.component.css',
})
export class MyDigimonComponent  {
  errorMessage: string | undefined;
curentData = computed(()=>{return this.DigimonsData.digimonsData()})

  constructor(private digimonService: DigimonService, private DigimonsData:DigimonStateService) {
  }

  DeleteDigimon(id: number) {
    this.digimonService.deletePost(id);
    this.DigimonsData.setData(this.curentData().filter((digimon) => digimon.id !== id));
  }

  // handleEvent(event: any) {
  //   console.log(event);
  //   this.digimonService.editPost(event.id, event);
  //   this.digimons.update((curentData:any) =>
  //     curentData.map((d) => (d.id === event.id ? event : d))
  //   );
  // }
}
