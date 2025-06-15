import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../../core/services/comment.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentModel } from '../../../../core/models/comments.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comments-post',
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './comments-post.component.html',
  styleUrl: './comments-post.component.css'
})
export class CommentsPostComponent implements OnInit{


  newComment: string = '';
  @Input() postId!: number;
  listComments: Observable<Array<CommentModel>> | undefined;

  constructor(private commentService: CommentService) {

  }

  ngOnInit(): void {
    // this.loadComments();
    this.listComments = this.commentService.listCommentObs$;
    this.commentService.getCommentsByPost(this.postId)
  }

  loadComments() {
    this.commentService.getCommentsByPost(this.postId);
  }

  addComment() {
    if (!this.newComment.trim()){
      return;
    }
    this.commentService.addCommentToPost(this.postId, this.newComment);
    this.newComment = "";
  }

  formatCommentDate(dateStr: string | Date): string {
    const date = new Date(dateStr);
    const now = new Date();

    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return new Intl.DateTimeFormat('default', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
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
