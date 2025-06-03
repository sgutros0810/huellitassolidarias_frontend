import { Component } from '@angular/core';
import { PostformComponent } from "./components/post-form/post-form.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";

@Component({
  selector: 'app-publicaciones',
  imports: [ PostformComponent, PostsListComponent ],
  templateUrl: './posts.component.html',
})

export class PostsComponent {
  mostrarFormulario = false;

  openModal() {
    document.body.classList.add('overflow-hidden');
    this.mostrarFormulario = true;
  }

  closeModal() {
    document.body.classList.remove('overflow-hidden');
    this.mostrarFormulario = false;
  }

}
