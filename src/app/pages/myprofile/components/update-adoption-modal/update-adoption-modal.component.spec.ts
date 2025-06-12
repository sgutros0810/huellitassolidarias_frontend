import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdoptionModalComponent } from './update-adoption-modal.component';

describe('UpdateAdoptionModalComponent', () => {
  let component: UpdateAdoptionModalComponent;
  let fixture: ComponentFixture<UpdateAdoptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAdoptionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAdoptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
