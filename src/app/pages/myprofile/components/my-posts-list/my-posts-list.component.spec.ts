import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPostsListComponent } from './my-posts-list.component';

describe('MyPostsListComponent', () => {
  let component: MyPostsListComponent;
  let fixture: ComponentFixture<MyPostsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyPostsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
