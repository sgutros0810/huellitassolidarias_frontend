import { Component, OnInit } from '@angular/core';
import { CommentsPostComponent } from "../comments-post/comments-post.component";
import { PostModel } from '../../../../core/modals/post.model';
import { Observable } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts-list',
  imports: [CommentsPostComponent, AsyncPipe],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {

  // posts: PostModel[] = [];
  page = 0;
  size = 10;
  loading = false;
  allLoaded = false;
  postList: Observable<Array<PostModel>> | undefined;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.loadMorePosts();
    this.postList = this.postService.listPostObs$;
    this.postService.getPosts(this.page, this.size);
  }

  // loadMorePosts(): void {
  //   this.loading = true;
  //   this.postService.getPosts(this.page, this.size).subscribe({
  //     next: (newPosts) => {

  //       // newPosts.forEach( post => {
  //       //   console.log(post)
  //       // });

  //       if(newPosts.length === 0){
  //         this.allLoaded = true;

  //       } else {
  //         this.posts.push(...newPosts);
  //         this.page++;
  //       }

  //       this.loading = false;
  //     },
  //     error: (error) => {
  //       console.log("Error: ", error)
  //       this.loading = false;
  //     }
  //   })
  // }
}
