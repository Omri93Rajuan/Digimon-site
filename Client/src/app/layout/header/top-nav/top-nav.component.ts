import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavLinkComponent } from '../../../components/nav-link/nav-link.component';

@Component({
  selector: 'top-nav',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,NavLinkComponent],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

}
