import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { PostModel } from '../../../../core/modals/post.model';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-my-posts-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './my-posts-list.component.html',
  styleUrl: './my-posts-list.component.css'
})
export class MyPostsListComponent implements OnInit{

  myPostList: Observable<Array<PostModel>> | undefined;


  constructor(private postService: PostService) {}


  ngOnInit(): void {
    this.myPostList = this.postService.listPostObs$;
    this.postService.getPostsId();
  }




}
