import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DigimonService } from '../../service/digimon.service';
import { Digimon } from '../../digimon';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router } from '@angular/router';

Navigator;
@Component({
  selector: 'app-search-digimon',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    PageHeaderComponent,
    MatProgressSpinnerModule,
    MatGridListModule
  ],
  templateUrl: './search-digimon.component.html',
  styleUrl: './search-digimon.component.css',
})
export class SearchDigimonComponent {
  digimonName = 'כתוב באנגלית';
  digimon: Digimon = {id:0,name: '', img: '', level: '' };
  errorMessage: string | undefined;

  constructor(private digimonService: DigimonService, private router:Router) {}

  getDigimonByName(digimonName: string) {
    this.digimonService.getDigimonByName(digimonName).subscribe({
      next: (data: any) => {
        this.digimon = data[0];
      },
      error: (error: any) => {
        this.errorMessage = "הדיג'ימון לא נמצא במערכת";

        setTimeout(() => {
          this.errorMessage = undefined;
        }, 3000); 
      }
    });
  }
  addDigimon() {
    console.log(this.digimon);
    this.digimonService.addPost(this.digimon);
    this.router.navigate(['myDigimon'])
  
  }
  DeleteDigimon(id:number){
    console.log(id);

    this.digimonService.deletePost(this.digimon.id);

  }
}
