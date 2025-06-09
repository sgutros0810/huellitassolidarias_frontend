import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../../core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postform',
  imports: [ FormsModule ],
  templateUrl: './post-form.component.html'
})

export class PostformComponent {

  @Output() closed = new EventEmitter<void>();

  post = {
      title: '',
      content: '',
      category: ''
  };

  selectedFile: File | null = null;

  constructor(private postService: PostService, private router: Router) {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  async submitPost() {
    if (!this.post.title || !this.post.content) return;

    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);
    formData.append('category', this.post.category);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.log("Selecciona una imagen");
    }

    try {
      await this.postService.createPost(formData);
      await this.postService.getPosts(0, 10);
      this.post = { title: '', content: '', category: '' };
      this.selectedFile = null;
      this.close();

    } catch (error) {
      console.error(error)
    }

  }

  close() {
    this.closed.emit();
  }
}
