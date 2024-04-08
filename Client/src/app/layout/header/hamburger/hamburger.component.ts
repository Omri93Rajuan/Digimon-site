import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { NavLinkComponent } from '../../../components/nav-link/nav-link.component';

@Component({
  selector: 'hamburger',
  standalone: true,
  imports: [MatButtonModule,MatMenuModule,MatIconModule,NavLinkComponent],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.css'
})
export class HamburgerComponent {

}
