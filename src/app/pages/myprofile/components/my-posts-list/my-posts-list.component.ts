import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostModel } from '../../../../core/models/post.model';
import { PostService } from '../../../../core/services/post.service';
import { UserService } from '../../../../core/services/user.service';
import { UpdatePostModalComponent } from "../update-post-modal/update-post-modal.component";

@Component({
  selector: 'app-my-posts-list',
  imports: [CommonModule, FormsModule, UpdatePostModalComponent],
  templateUrl: './my-posts-list.component.html',
  styleUrl: './my-posts-list.component.css'
})

export class MyPostsListComponent implements OnInit{

  myPostList!: Observable<PostModel[]>;
  posts: PostModel[] = [];
  @Input() myPost: PostModel[] =  [];

  selectedPostId: number | null = null;
  showEditModal = false

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.myPostList = this.postService.listPostObs$;
    this.postService.getMyPosts(0, 10)
  }

  deletePost(postId: number){
    this.postService.deleteMyPost(postId).subscribe({
      next: () => {
        this.postService.deletePostLocal(postId)
      },
      error: err => {
        console.error('Error al eliminar el post', err)
      }
    });
  }

  openEditModal(postId: number): void {
    document.body.classList.add('overflow-hidden');
    this.selectedPostId = postId;
    this.showEditModal = true;
  }

  closeModal() {
    document.body.classList.remove('overflow-hidden');
    this.showEditModal = false;
    this.selectedPostId = null;

    // refresca la lista para ver los cambios
    this.postService.getMyPosts(0, 10);
  }

}
