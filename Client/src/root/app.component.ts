import { Component, effect } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../app/layout/layout.component';
import { DigimonService } from '../app/service/digimon.service';
import { DigimonStateService } from '../app/service/digimon-state.service';
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

  constructor(private DS:DigimonService,  private DigimonsData:DigimonStateService){ }

ngOnInit(){
  this.DS.getAllDigimon().subscribe({
     
    next: (digimons: Digimon[] ) => {  
      this.DigimonsData.setData(digimons);
    },
    error: (error: HttpErrorResponse) => {
      this.errorMessage = error.message;
    }
  })
}
}
