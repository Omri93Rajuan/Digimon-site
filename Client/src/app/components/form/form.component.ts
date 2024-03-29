import { Component, effect, input, signal } from '@angular/core';
import {  FormBuilder,FormGroup } from '@angular/forms'; // ייבוא חסר
import { ReactiveFormsModule} from '@angular/forms';
import { DigimonService } from '../../service/digimon.service';
import { Digimon } from '../../digimon';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatCard,MatButton,MatInputModule,MatSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  digimonForm!: FormGroup;
  id =input.required<number>()
  digimon = signal(null)

  constructor( private DS:DigimonService,private formBuilder: FormBuilder){
    this.createDigimonForm()
    effect(() =>{
      this.DS.getDigimonById(this.id()).subscribe(
        data => this.digimon = data        
      )
    })
    console.log(this.digimon);

  }

  createDigimonForm() {
    this.digimonForm = this.formBuilder.group({
      id:0,
      name: [''],
      img: [''],
      level: ['']
    });
  }
  addDigimon(){
    console.log(this.digimon);
    
  }
}
