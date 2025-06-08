import { Component, OnInit } from '@angular/core';
import { CommentsPostComponent } from "../comments-post/comments-post.component";
import { PostModel } from '../../../../core/modals/post.model';
import { Observable } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-posts-list',
  imports: [CommentsPostComponent, AsyncPipe, CommentsPostComponent],
  templateUrl: './posts-list.component.html'
})
export class PostsListComponent implements OnInit {


  page = 0;
  size = 10;
  loading = false;
  allLoaded = false;
  postList: Observable<Array<PostModel>> | undefined;
  commentPostId: number | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.loadMorePosts();
    this.postList = this.postService.listPostObs$;
    this.postService.getPosts(this.page, this.size);
  }

  openComment(postId: number) {
    this.commentPostId = this.commentPostId === postId ? null : postId; // toggle
  }

  formatPostDate(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const now = new Date();

    const differentMs = now.getTime() - date.getTime();
    const differentMinutes = Math.floor(differentMs / (1000 * 60));
    const differentHours = Math.floor(differentMinutes / 60);
    const differentDays = Math.floor(differentHours / 24);

    if (differentMinutes < 1) {
      return 'Publicado hace unos segundos';
    } else if (differentMinutes < 60) {
      return `Publicado hace ${differentMinutes} minuto${differentMinutes === 1 ? '' : 's'}`;
    } else if (differentHours < 24) {
      return `Publicado hace ${differentHours} hora${differentHours === 1 ? '' : 's'}`;
    } else if (differentDays < 7) {
      return `Publicado hace ${differentDays} día${differentDays === 1 ? '' : 's'}`;
    }


    return new Intl.DateTimeFormat('default', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }


}
