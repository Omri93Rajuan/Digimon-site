import { Component } from '@angular/core';
import {ThreeDCharacterComponent} from "../../three-carcharacter/three-carcharacter.component"

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ThreeDCharacterComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
