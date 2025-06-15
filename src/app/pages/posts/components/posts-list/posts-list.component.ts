import { Component, OnInit } from '@angular/core';
import { CommentsPostComponent } from "../comments-post/comments-post.component";
import { PostModel } from '../../../../core/models/post.model';
import { Observable } from 'rxjs';
import { PostService } from '../../../../core/services/post.service';
import { AsyncPipe } from '@angular/common';
import {buildImageUrl} from '../../../../shared/utils/image-url.util';
import {UserProfileModel} from '../../../../core/models/user.model';

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

  defaultAvatar = '/img/avatar-default.png';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    // this.loadMorePosts();
    this.postList = this.postService.listPostObs$;
    this.postService.getPosts(this.page, this.size);
  }


  onAvatarError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultAvatar;
  }

  openComment(postId: number) {
    this.commentPostId = this.commentPostId === postId ? null : postId; // toggle
  }

  // Formato de fecha y hora del post
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


  protected readonly buildImageUrl = buildImageUrl;
}
