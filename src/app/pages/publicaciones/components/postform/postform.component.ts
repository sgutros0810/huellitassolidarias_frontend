import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../../core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postform',
  imports: [ FormsModule ],
  templateUrl: './postform.component.html',
  styleUrl: './postform.component.css'
})
export class PostformComponent {

  @Output() closed = new EventEmitter<void>();

  post = {
      title: '',
      content: ''
  };

  selectedFile: File | null = null;

  constructor(private postService: PostService, private router: Router) {

  }

   onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)
  }

  submitPost() {
    if (!this.post.title || !this.post.content) return;

    const formData = new FormData();
    formData.append('title', this.post.title);
    formData.append('content', this.post.content);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.log("Selecciona una imagen")
    }

    this.postService.createPost(formData).subscribe({
      next: (response : any)  => {
        // console.log('Publicación creada', response);

        this.post = { title: '', content: ''};
        this.selectedFile = null;
        this.postService.getPosts(0, 0);
        this.close();
      },
      error: (error: any)  => {
        console.error('Error al crear la publicación', error);
      }
    });
  }




  close() {
    this.closed.emit();
  }
}
