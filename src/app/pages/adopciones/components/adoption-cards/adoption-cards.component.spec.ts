import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionCardsComponent } from './adoption-cards.component';

describe('CardsComponent', () => {
  let component: AdoptionCardsComponent;
  let fixture: ComponentFixture<AdoptionCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
