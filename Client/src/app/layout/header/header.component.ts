import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavLinkComponent } from '../../components/nav-link/nav-link.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,NavLinkComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
