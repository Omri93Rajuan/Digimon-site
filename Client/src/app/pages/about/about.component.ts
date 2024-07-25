import { Component } from '@angular/core';
import { PageHeaderComponent } from '../../components/page-header/page-header.component';
import {ThreeDCharacterComponent} from "../../three-carcharacter/three-carcharacter.component"

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageHeaderComponent,ThreeDCharacterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
