import { Component, HostListener } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { TopNavComponent } from './top-nav/top-nav.component';

@Component({
  selector: 'header',
  standalone: true,
  imports: [MatToolbarModule,TopNavComponent,HamburgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
  
})
export class HeaderComponent {
  isSmallScreen = false;

  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isSmallScreen = window.innerWidth < 768;
  }
}
