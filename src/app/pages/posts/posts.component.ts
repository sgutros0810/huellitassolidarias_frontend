import {Component, inject} from '@angular/core';
import { PostformComponent } from "./components/post-form/post-form.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {LoginPromptModalComponent} from '../../shared/components/login-prompt-modal/login-prompt-modal.component';

@Component({
  selector: 'app-publicaciones',
  imports: [PostformComponent, PostsListComponent, LoginPromptModalComponent],
  templateUrl: './posts.component.html',
})

export class PostsComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  mostrarFormulario = false;
  showLoginPrompt    = false;

  openModal() {
    document.body.classList.add('overflow-hidden');
    if (!this.auth.isUserLogged()) {
      this.showLoginPrompt = true;
      return;
    }
    this.mostrarFormulario = true;
  }

  closeModal() {
    this.mostrarFormulario = false;
    document.body.classList.remove('overflow-hidden');
  }

  closeLoginPrompt() {
    this.showLoginPrompt = false;
    document.body.classList.remove('overflow-hidden');
  }

  goToLogin() {
    this.router.navigate(['/loginuser']);
  }

}
