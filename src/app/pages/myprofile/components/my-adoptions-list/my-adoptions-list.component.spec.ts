import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdoptionsListComponent } from './my-adoptions-list.component';

describe('MyAdoptionsListComponent', () => {
  let component: MyAdoptionsListComponent;
  let fixture: ComponentFixture<MyAdoptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAdoptionsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAdoptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
