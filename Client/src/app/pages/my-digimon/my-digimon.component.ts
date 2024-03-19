import { Component, OnInit } from '@angular/core';
import { DigimonService } from '../../Service/digimon.service';
import { Digimon } from '../../digimon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-my-digimon',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './my-digimon.component.html',
  styleUrl: './my-digimon.component.css'
})
export class MyDigimonComponent implements OnInit {
  digimons: Digimon | any = []
  errorMessage: string | undefined;


  constructor(private digimonService: DigimonService){
  }
  
  ngOnInit(): void {
    this.digimonService.getAllDigimon().subscribe({
      next: (digimons:Digimon[]) => {
        this.digimons = digimons;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = error.message;
      }
    });
  }
}