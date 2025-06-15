import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommentModel} from '../../../../../core/models/comments.model';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-comments-modal',
  standalone: true,
  templateUrl: './comments-modal.component.html',
  imports: [CommonModule],
})
export class CommentsModalComponent {
  @Input() comments: CommentModel[] = [];
  @Input() postTitle: string = '';
  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() deleteComment = new EventEmitter<number>();

  onClose() {
    this.close.emit();
  }

  onDelete(commentId: number) {
    this.deleteComment.emit(commentId);
  }
}
