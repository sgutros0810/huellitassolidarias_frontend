import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterAdoptionsListComponent } from './shelter-adoptions-list.component';

describe('ShelterAdoptionsListComponent', () => {
  let component: ShelterAdoptionsListComponent;
  let fixture: ComponentFixture<ShelterAdoptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShelterAdoptionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterAdoptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
