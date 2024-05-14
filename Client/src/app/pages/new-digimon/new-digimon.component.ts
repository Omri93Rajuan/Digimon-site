import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private _snackBar: MatSnackBar
  ) {
    this.createDigimonForm();
  }

  createDigimonForm() {
    this.digimonForm = this.formBuilder.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(4)]],
      img: [
        '',
        [Validators.required, Validators.pattern('(https?://.*.(?:png|jpg))')],
      ],
      level: ['', [Validators.required]],
    });
  }

  addDigimon() {
    this.digimon = this.digimonForm.value;
    this.digimonService.addPost(this.digimon, () => {
      // this.openSnackBar('Digimon added successfully!');
      this.router.navigate(['/myDigimon']);
    });
  }

  // openSnackBar(message: string) {
  //   this._snackBar.open(message, 'Close', {
  //     duration: 3000,
  //   });
  // }
}
