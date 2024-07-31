import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
  private character!: THREE.Group;
  private controls!: OrbitControls;

  constructor() { }

  ngOnInit() {
    this.initThreeJS();
  }

  ngAfterViewInit() {
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
    this.controls.update();
  }

  private initThreeJS() {
    // יצירת סצנה
    this.scene = new THREE.Scene();

    // יצירת מצלמה
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 6;

    // יצירת רנדרר עם רקע שקוף
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth / 1.5, window.innerHeight / 1.5);

    // הוספת תאורה לסצנה
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(5, 5, 5).normalize();
    this.scene.add(directionalLight);

    // יצירת OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; // מאפשר דמפינג (תנועה חלקה יותר)
    this.controls.minDistance = 2; // המרחק המינימלי של המצלמה מהאובייקט
    this.controls.maxDistance = 20; // המרחק המקסימלי של המצלמה מהאובייקט

    // טעינת הדגם
    const loader = new GLTFLoader();

    loader.load(
      '/assets/digimon_greymon.glb',
      (gltf) => {
        this.character = gltf.scene;
        this.character.scale.set(1.5, 1.5, 1.5); // הקטנת המודל בחצי
        this.character.position.set(0, 1, 0);
        this.scene.add(this.character);
      }
    );
  }

  private animate() {
    requestAnimationFrame(() => this.animate());

    this.controls.update();

    if (this.character) {
      this.character.rotation.y += 0.002; // סיבוב איטי בציר ה-Y
    }

    this.renderer.render(this.scene, this.camera);
  }
//responsive view
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateRendererSize();
  }

  private updateRendererSize() {
    const container = this.rendererContainer.nativeElement;
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
  }
}