import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostformComponent } from './post-form.component';

describe('PostformComponent', () => {
  let component: PostformComponent;
  let fixture: ComponentFixture<PostformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
