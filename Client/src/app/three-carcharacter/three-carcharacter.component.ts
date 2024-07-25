import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-character',
  standalone: true,
  templateUrl: './three-carcharacter.component.html',
  styleUrls: ['./three-carcharacter.component.css']
})
export class ThreeDCharacterComponent implements OnInit, AfterViewInit {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private character!: THREE.Mesh;

  constructor() { }

  ngOnInit() {
    this.initThreeJS();
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  private initThreeJS() {
    // יצירת סצנה, מצלמה ורנדרר
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.z = 5;

    // יצירת הדמות (במקרה זה, קובייה)
    const geometry = new THREE.BoxGeometry(1, 2, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.character = new THREE.Mesh(geometry, material);

    // הוספת הדמות לסצנה
    this.scene.add(this.character);
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    // אנימציה של הדמות
    this.character.rotation.x += 0.01;
    this.character.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}