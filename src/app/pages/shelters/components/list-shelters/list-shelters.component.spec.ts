import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSheltersComponent } from './list-shelters.component';

describe('ListSheltersComponent', () => {
  let component: ListSheltersComponent;
  let fixture: ComponentFixture<ListSheltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSheltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSheltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
