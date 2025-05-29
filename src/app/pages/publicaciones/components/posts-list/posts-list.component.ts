import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../../core/services/post.service';
import { CommentsPostComponent } from "../comments-post/comments-post.component";

@Component({
  selector: 'app-posts-list',
  imports: [CommentsPostComponent],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.css'
})
export class PostsListComponent implements OnInit {

  posts: any[] = [];
  page = 0;
  size = 10;
  loading = false;
  allLoaded = false;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadMorePosts();
  }

  loadMorePosts(): void {
    this.loading = true;
    this.postService.getPosts(this.page, this.size).subscribe({
      next: (newPosts) => {

        // newPosts.forEach( post => {
        //   console.log(post)
        // });

        if(newPosts.length === 0){
          this.allLoaded = true;

        } else {
          this.posts.push(...newPosts);
          this.page++;
        }

        this.loading = false;
      },
      error: (error) => {
        console.log("Error: ", error)
        this.loading = false;
      }
    })

  }
}
