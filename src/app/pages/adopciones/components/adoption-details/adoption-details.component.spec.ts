import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionDetailsComponent } from './adoption-details.component';

describe('AdoptionDetailsComponent', () => {
  let component: AdoptionDetailsComponent;
  let fixture: ComponentFixture<AdoptionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
