import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink, CommonModule ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  isUserMenuOpen = false;
  authenticated:boolean = false;
  isNavOpen = false;

  goToLogin() {
    this.router.navigate(['/loginuser']);
  }

  goToRegister() {
    this.router.navigate(['/registeruser']);
  }

  isAuthenticated() {
    return this.authService.isUserLogged();
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    const isMobile = window.innerWidth < 1024;

    if (this.isNavOpen && isMobile) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  logout() {
    // Lógica para cerrar sesión
  }
}
