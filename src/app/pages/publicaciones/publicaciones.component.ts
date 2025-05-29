import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { PostformComponent } from "./components/postform/postform.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";

@Component({
  selector: 'app-publicaciones',
  imports: [NgIf, PostformComponent, PostsListComponent],
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css'
})
export class PublicacionesComponent {
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
