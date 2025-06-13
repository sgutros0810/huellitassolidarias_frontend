import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../../core/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postform',
  imports: [ FormsModule, ReactiveFormsModule  ],
  templateUrl: './post-form.component.html'
})

export class PostformComponent implements OnInit {

  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  selectedFile: File | null = null;

  categories = [
  { value: 'ADOPTION', label: 'Adopción' },
  { value: 'ADVICE',   label: 'Consejo'  },
  { value: 'RESCUE',   label: 'Rescate' }
  ];


  constructor(private postService: PostService, private router: Router, private formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      title:    ['', [Validators.required, Validators.minLength(4)]],
      content:  ['', [Validators.required, Validators.minLength(10)]],
      image:    [null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    const input = (event.target as HTMLInputElement);
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      this.form.patchValue({ image: this.selectedFile });
    }
    // console.log(this.selectedFile)
  }

  async submitPost() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { category, title, content } = this.form.value;
    const formData = new FormData();
    formData.append('category', category);
    formData.append('title', title);
    formData.append('content', content);


    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    try {
      await this.postService.createPost(formData);
      await this.postService.getPosts(0, 10);
      this.form.reset();
      this.closed.emit();

    } catch (err) {
      console.error(err);
      alert('Error al publicar el post');
    }
  }

  close() {
    this.closed.emit();
  }
}
