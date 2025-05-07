import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShelterComponent } from './register-shelter.component';

describe('RegisterShelterComponent', () => {
  let component: RegisterShelterComponent;
  let fixture: ComponentFixture<RegisterShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterShelterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
