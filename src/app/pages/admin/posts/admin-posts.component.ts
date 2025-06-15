import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { PostModel } from '../../../core/models/post.model';
import {FormsModule} from '@angular/forms';
import {buildImageUrl} from '../../../shared/utils/image-url.util';
import {ModalConfirmComponent} from '../../../shared/components/modal-confirm/modal-confirm.component';
import {CommentService} from '../../../core/services/comment.service';
import {CommentModel} from '../../../core/models/comments.model';

@Component({
  standalone: true,
  selector: 'app-admin-posts',
  templateUrl: './admin-posts.component.html',
  imports: [CommonModule, ToastComponent, FormsModule, ModalConfirmComponent],
})
export class AdminPostsComponent implements OnInit {

  private adminService = inject(AdminService);
  commentService = inject(CommentService);

  commentsVisibility: Record<number, boolean> = {};
  commentsMap: Record<number, CommentModel[]> = {};

  @ViewChild('toast') toast?: ToastComponent;

  posts: PostModel[] = [];
  page = 0;
  size = 10;
  totalPages = 0;

  search: string = '';
  allPosts: PostModel[] = [];

  postToDeleteId: number | null = null;
  modalOpen = false;
  selectedPostTitle: string = '';
  selectedPostId: number | null = null;
  commentsModalOpen = false;


  ngOnInit() {
    this.loadPosts();
  }

  openCommentsModal(postId: number, title: string): void {
    this.commentService.getCommentsByPost(postId).then(() => {
      this.commentsMap[postId] = this.commentService.CommentModel;
      this.selectedPostId = postId;
      this.selectedPostTitle = title;
      this.commentsModalOpen = true;
    });
  }

  closeCommentsModal(): void {
    this.commentsModalOpen = false;
    this.selectedPostId = null;
  }


  loadPosts(): void {
    this.adminService.getAllPosts(this.page, this.size).subscribe(data => {
      this.allPosts = data.content;
      this.posts = [...this.allPosts];
      this.totalPages = data.totalPages;
    });
  }

  onDeleteComment(commentId: number): void {
    if (this.selectedPostId !== null) {
      this.adminService.deleteComment(commentId).subscribe(() => {
        this.commentsMap[this.selectedPostId!] = this.commentsMap[this.selectedPostId!].filter(c => c.id !== commentId);
        // this.toast?.showMessage('Comentario eliminado correctamente');
      });
    }
  }



  onSearchChanged(): void {
    const term = this.search.trim().toLowerCase();

    if (term === '') {
      this.loadPosts();
    } else {
      const filtered = this.allPosts.filter(post =>
        post.username.toLowerCase().includes(term)
      );
      this.posts = filtered;
    }
  }

  openDeleteModal(postId: number) {
    this.postToDeleteId = postId;
    this.modalOpen = true;
  }

  onConfirmDelete() {
    if (this.postToDeleteId !== null) {
      this.adminService.deletePost(this.postToDeleteId).subscribe({
        next: () => {
          this.posts = this.posts.filter(post => post.id !== this.postToDeleteId);
          if (this.toast) {
            this.toast.message = 'Post eliminado correctamente';
            this.toast.show();
          }
          this.modalOpen = false;
          this.postToDeleteId = null;
        },
        error: () => {
          if (this.toast) {
            this.toast.message = 'Error al eliminar el post';
            this.toast.show();
          }
          this.modalOpen = false;
          this.postToDeleteId = null;
        }
      });
    }
  }




  onCancelDelete() {
    this.modalOpen = false;
    this.postToDeleteId = null;
  }

  toggleComments(postId: number): void {
    if (this.commentsVisibility[postId]) {
      this.commentsVisibility[postId] = false;
      return;
    }

    this.commentService.getCommentsByPost(postId).then(() => {
      this.commentsMap[postId] = this.commentService.CommentModel;
      this.commentsVisibility[postId] = true;
    });
  }


  changePage(offset: number) {
    this.page += offset;
    this.loadPosts();
  }

  protected readonly buildImageUrl = buildImageUrl;
}
