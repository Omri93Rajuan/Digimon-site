import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDigimonComponent } from './new-digimon.component';

describe('NewDigimonComponent', () => {
  let component: NewDigimonComponent;
  let fixture: ComponentFixture<NewDigimonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDigimonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewDigimonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
