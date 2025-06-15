import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionFilterComponent } from './adoption-filter.component';

describe('FilterComponent', () => {
  let component: AdoptionFilterComponent;
  let fixture: ComponentFixture<AdoptionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
