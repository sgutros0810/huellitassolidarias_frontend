import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReportComponent } from './card-report.component';

describe('CardReportComponent', () => {
  let component: CardReportComponent;
  let fixture: ComponentFixture<CardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
