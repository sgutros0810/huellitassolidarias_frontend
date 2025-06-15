import {Component, inject, Input} from '@angular/core';
import { AdoptionCardsComponent } from "./components/adoption-cards/adoption-cards.component";
import { AdoptionFilterComponent } from "./components/adoption-filter/adoption-filter.component";
import { AdoptionFormComponent } from "./components/adoption-form/adoption-form.component";
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {LoginPromptModalComponent} from '../../shared/components/login-prompt-modal/login-prompt-modal.component';
import {AdoptionModel} from '../../core/models/adoption.model';

@Component({
  selector: 'app-adopciones',
  imports: [AdoptionCardsComponent, AdoptionFilterComponent, AdoptionFormComponent, LoginPromptModalComponent],
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.css'
})
export class AdopcionesComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  filteredAdoptions: AdoptionModel[] = [];

  showCreateModal = false;
  showLoginPrompt  = false;

  onFilteredAdoptions(adoptions: AdoptionModel[]) {
    this.filteredAdoptions = adoptions;
  }

  openCreateModal() {
    document.body.classList.add('overflow-hidden');
    if (!this.auth.isUserLogged()) {
      this.showLoginPrompt = true;
      return;
    }
    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
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
