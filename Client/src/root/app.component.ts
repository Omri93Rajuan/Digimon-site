import { Component, effect } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../app/layout/layout.component';
import { DigimonService } from '../app/service/digimon.service';
import { Digimon } from '../app/digimon';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LayoutComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'digimon-clinet';
  errorMessage: string | undefined;

  constructor(private DS:DigimonService){ }


}
