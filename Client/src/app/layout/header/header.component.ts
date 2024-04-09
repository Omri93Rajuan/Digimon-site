import { Component, HostListener, OnInit, WritableSignal, signal } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'header',
  standalone: true,
  imports: [MatToolbarModule,TopNavComponent,HamburgerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
  
})
export class HeaderComponent implements OnInit {
  isSmallScreen:WritableSignal<boolean> = signal(false);


  constructor(private readonly mediaMatcher: MediaMatcher) {}


  ngOnInit() {
    this.isSmallScreen.set(this.mediaMatcher.matchMedia('(max-width: 768px)').matches)

    const mediaQueryList = this.mediaMatcher.matchMedia('(max-width: 768px)');
    mediaQueryList.addEventListener('change', (event: MediaQueryListEvent) => {
      this.isSmallScreen.set(event.matches);
    });
  }
}
