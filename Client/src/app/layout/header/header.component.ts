import { Component, HostListener, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavLinkComponent } from '../../components/nav-link/nav-link.component';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'header',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,NavLinkComponent,HamburgerComponent],
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
