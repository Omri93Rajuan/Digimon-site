import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; // ייבוא חסר
import { ReactiveFormsModule } from '@angular/forms';
import { DigimonService } from '../../service/digimon.service';
import { Digimon } from '../../digimon';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import { Router } from '@angular/router';
import { DigimonStateService } from '../../service/digimon-state.service';

@Component({
  selector: 'app-new-digimon',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCard,
    MatButton,
    MatInputModule,
    MatSelectModule,
    PageHeaderComponent,
  ],
  templateUrl: './new-digimon.component.html',
  styleUrls: ['./new-digimon.component.css'],
})
export class NewDigimonComponent {
  digimonForm!: FormGroup;
  digimon: Digimon = { id: 0, name: '', img: '', level: '' };

  constructor(
    private formBuilder: FormBuilder,
    private digimonService: DigimonService,
    private router: Router,
    private DigimonsData:DigimonStateService
  ) {
    this.createDigimonForm();
  }

  createDigimonForm() {
    this.digimonForm = this.formBuilder.group({
      id: 0,
      name: [''],
      img: [''],
      level: [''],
    });
  }

  addDigimon() {
    this.digimon = this.digimonForm.value;
    this.digimonService.addPost(this.digimon, () =>{
      this.router.navigate(['/myDigimon'])}
    );
  }
}
