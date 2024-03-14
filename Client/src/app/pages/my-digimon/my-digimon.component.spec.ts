import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDigimonComponent } from './my-digimon.component';

describe('MyDigimonComponent', () => {
  let component: MyDigimonComponent;
  let fixture: ComponentFixture<MyDigimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDigimonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyDigimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
