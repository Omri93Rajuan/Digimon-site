import { Component, EventEmitter, Inject, OnInit, Output, effect, input, signal } from '@angular/core';
import {  FormBuilder,FormGroup } from '@angular/forms'; // ייבוא חסר
import { ReactiveFormsModule} from '@angular/forms';
import { DigimonService } from '../../service/digimon.service';
import { Digimon } from '../../digimon';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatCard,MatButton,MatInputModule,MatSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css' ,
})
export class FormComponent implements OnInit {
  digimonForm!: FormGroup;
  id =input<number>()
  digimon = signal<Digimon>(
    { id: 0, name: '', img: '', level: '' },
  )
  @Output() childEvent = new EventEmitter<Digimon>();

  dataRow:any ={}

  constructor( private DS:DigimonService,private formBuilder: FormBuilder, private router: Router
    ){
      
    this.createDigimonForm()
    
    }
  

    createDigimonForm() {
      this.digimonForm = this.formBuilder.group({
        id: [this.digimon().id],
        name: [this.digimon().name],
        img: [this.digimon().img],
        level: [this.digimon().level] 
      });
    }

  addDigimon(){
this.DS.editPost(this.digimon().id,this.digimonForm.value)  

  }
  emitChildData(){    
    this.childEvent.emit(this.digimonForm.value);

  }



  ngOnInit(): void {
    this.DS.getDigimonById(this.id()).subscribe(
      data => {
        this.digimon.set(data);
        this.createDigimonForm();        
      }      
    );
  }
}
