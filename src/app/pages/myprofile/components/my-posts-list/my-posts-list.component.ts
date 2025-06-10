import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostModel } from '../../../../core/modals/post.model';
import { PostService } from '../../../../core/services/post.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-my-posts-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-posts-list.component.html',
  styleUrl: './my-posts-list.component.css'
})

export class MyPostsListComponent implements OnInit{

  myPostList!: Observable<PostModel[]>;
  posts: PostModel[] = [];
  @Input() myPost: PostModel[] =  [];

  constructor(private postService: PostService, private userService: UserService) {}

  ngOnInit(): void {
    this.myPostList = this.postService.getMyPosts(0, 10);
  }

  deletePost(postId: number){
    this.postService.deleteMyPost(postId).subscribe({
      next: () => {
        this.postService.deletePostLocal(postId);
      },
      error: err => {
        console.error('Error al eliminar el post', err)
      }
    })
  }


}
