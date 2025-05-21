import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth.service';


@Component({
  selector: 'app-navbar',
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  authenticated:boolean = false;

  goToLogin() {
    this.router.navigate(['/loginuser']);
  }

  goToRegister() {
    this.router.navigate(['/registeruser']);
  }

  isAuthenticated() {
    return this.authService.isUserLogged();
  }

  isNavOpen = false;

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }
}
