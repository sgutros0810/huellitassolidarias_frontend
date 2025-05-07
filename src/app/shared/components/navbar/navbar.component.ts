import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [ RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private router = inject(Router);

  goToLogin() {
    this.router.navigate(['/loginuser']);
  }

  goToRegister() {
    this.router.navigate(['/registeruser']);
  }

}
