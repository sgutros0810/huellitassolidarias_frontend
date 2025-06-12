import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../../core/services/post.service';
import { PostDetailModel } from '../../../../core/modals/post-detail.model';
import { AsyncPipe } from '@angular/common';
import { PostModel } from '../../../../core/modals/post.model';

@Component({
  selector: 'app-update-post-modal',
  imports: [ AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './update-post-modal.component.html',
  styleUrl: './update-post-modal.component.css'
})
export class UpdatePostModalComponent implements OnInit {

  @Input() postId!: number;
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  fileToUpload: File | null = null;
  currentImageUrl: string | null = null;


  categories = [
    { value: 'ADOPTION', label: 'Adopción' },
    { value: 'ADVICE',   label: 'Consejo'   },
    { value: 'RESCUE',   label: 'Rescate'   }
  ];

  constructor( private postService: PostService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      category: ['', Validators.required],
      title:    ['', [Validators.required, Validators.minLength(4)]],
      content:  ['', [Validators.required, Validators.minLength(10)]],
      image:    [null]
    });

    // mostrar el post
    this.postService.getMyPosts().subscribe({
      next: (posts: PostModel[]) => {

        const post = posts.find(p => p.id === this.postId);
        if (!post) return;

        // Si tiene ya una imagen  imagen, la guarda
        this.currentImageUrl = post.imageUrl ? `/uploads/adoptions/${post.imageUrl}` : null;

        this.form.patchValue({
          category: post.category,
          title:    post.title,
          content:  post.content,
          createdAt: post.createdAt
        });
      },
      error: () => console.error('No se pudo cargar el post')
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    this.fileToUpload = input.files[0];
    this.form.patchValue({ image: this.fileToUpload });
    const reader = new FileReader();
    reader.onload = () => (this.currentImageUrl = reader.result as string);
    reader.readAsDataURL(this.fileToUpload);
  }


  async submitPost(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === 'image') return;
      formData.append(key, String(val));
    });

    if (this.fileToUpload) {
      formData.append('image', this.fileToUpload);
    }

    try {
     await this.postService.updatePost(this.postId, formData);
      await this.postService.getPosts(0, 10);
      this.close();
    } catch {
      alert('Error al actualizar la publicación');
    }
  }

  close(): void {
    this.closed.emit();
  }
}
