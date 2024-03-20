
import { Component, OnInit, signal } from '@angular/core';
import { DigimonService } from '../../Service/digimon.service';
import { Digimon } from '../../digimon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-my-digimon',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './my-digimon.component.html',
  styleUrl: './my-digimon.component.css'
})
export class MyDigimonComponent implements OnInit {
  digimons: Digimon[] | any = signal([])
  errorMessage: string | undefined;
  private subscription: Subscription | undefined; // Store the subscription


  constructor(private digimonService: DigimonService, private router: Router){
  }
  
  DeleteDigimon(id:number){
    console.log(this.digimons);
    this.digimonService.deletePost(id);
this.router.navigate(["myDigimon"]) 
    

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