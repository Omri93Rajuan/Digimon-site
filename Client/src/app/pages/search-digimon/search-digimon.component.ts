import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DigimonService } from '../../service/digimon.service';
import { Digimon } from '../../digimon';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

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
    PageHeaderComponent
  ],
  templateUrl: './search-digimon.component.html',
  styleUrl: './search-digimon.component.css',
})
export class SearchDigimonComponent {
  digimonName = 'כתוב באנגלית';
  digimon: Digimon = {id:0,name: '', img: '', level: '' };

  constructor(private digimonService: DigimonService) {}

  getDigimonByName(digimonName: string) {
    this.digimonService.getDigimonByName(digimonName).subscribe((data: any) => {
      this.digimon = data[0];
    });
  }

  addDigimon() {
    console.log(this.digimon);
    this.digimonService.addPost(this.digimon);
  }
  DeleteDigimon(id:number){
    console.log(id);

    this.digimonService.deletePost(this.digimon.id);

  }
}
