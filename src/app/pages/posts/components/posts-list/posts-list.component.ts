import { Component, OnInit } from '@angular/core';
import { CommentsPostComponent } from "../comments-post/comments-post.component";
import { PostModel } from '../../../../core/modals/post.model';
import { Observable } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts-list',
  imports: [CommentsPostComponent, AsyncPipe],
  templateUrl: './posts-list.component.html'
})
export class PostsListComponent implements OnInit {


  page = 0;
  size = 10;
  loading = false;
  allLoaded = false;
  postList: Observable<Array<PostModel>> | undefined;
  // posts: PostModel[] = [];´

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.loadMorePosts();
    this.postList = this.postService.listPostObs$;
    this.postService.getPosts(this.page, this.size);
  }

}
