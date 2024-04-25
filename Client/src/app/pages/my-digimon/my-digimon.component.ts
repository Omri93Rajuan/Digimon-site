import {
  Component,
  DestroyRef,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { DigimonService } from '../../service/digimon.service';
import { Digimon } from '../../digimon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PageHeaderComponent } from '../../components/page-header/page-header.component';

import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'app-my-digimon',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, PageHeaderComponent, FormComponent],
  templateUrl: './my-digimon.component.html',
  styleUrl: './my-digimon.component.css',
})
export class MyDigimonComponent {
  errorMessage: string | undefined;
  digimonsData: WritableSignal<Digimon[]> = signal([]);

  constructor(private digimonService: DigimonService) {
    effect(() => {
      if (this.digimonsData().length === 0) {
        this.digimonsData();
      }
      this.digimonService.getAllDigimon().subscribe((data) => {
        this.digimonsData.set(data);
      });
    });
  }

  DeleteDigimon(id: number) {
    this.digimonService.deletePost(id);
  }

  handleEvent(event: any) {
    console.log(event);
    this.digimonService.editPost(event.id, event);
    this.digimonsData.update((digimons) =>
      digimons.map((d) => (d.id === event.id ? event : d))
    );
  }
}
