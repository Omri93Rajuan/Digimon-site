import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.css'
})
export class PageHeaderComponent {
  @Input() title:string = "" 
  @Input() subTitle:string = ""  
  @Input() icon:string = ""  
  @Input() bgColor: string = 'alert-success rounded-3 p-2';
  
  
    constructor() { }
}
