
import { Component, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { DigimonService } from '../../Service/digimon.service';
import { Digimon } from '../../digimon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';

@Component({
  selector: 'app-my-digimon',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,PageHeaderComponent
  ],
  templateUrl: './my-digimon.component.html',
  styleUrl: './my-digimon.component.css'
})
export class MyDigimonComponent implements OnInit {
  digimons :WritableSignal <Digimon[]> = signal([{id:0,name: '', img: '', level: '' }])
  
  errorMessage: string | undefined;


  constructor(private digimonService: DigimonService, private router: Router){

  }
  
  DeleteDigimon(id:number){
    this.digimonService.deletePost(id);
    this.digimons.set(this.digimons().filter(digimon => digimon.id !== id))
  }

  editDigimon(id:number,digimonData:Digimon){
    this.digimonService.editPost(id,digimonData);
  }


  ngOnInit(): void {
    this.digimonService.getAllDigimon().subscribe({
      next: (digimons:Digimon[] | any) => {        
        this.digimons.set(digimons);

      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    });
  }
 
  }