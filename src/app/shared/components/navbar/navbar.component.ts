import { ChangeDetectorRef, Component, computed, effect, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { UserProfileModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/services/user.service';
import { buildImageUrl } from '../../utils/image-url.util';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);

  defaultAvatar = '/img/avatar-default.png';
  isUserMenuOpen = false;
  isNavOpen = false;

  profile = signal<UserProfileModel | null>(null);
  isAuthenticated = computed(() => this.authService.isUserLogged());
  isAdmin = computed(() => this.profile()?.role === 'ADMIN');

  constructor() {
    effect(() => {
      if (this.isAuthenticated()) {
        this.userService.profile$.subscribe(profile => {
          this.profile.set(profile);
          this.cdr.detectChanges();
        });

        this.userService.getProfile().subscribe();
      } else {
        this.profile.set(null);
      }
    });
  }

  get avatarSrc(): string {
    const currentProfile = this.profile();
    if (!currentProfile) return this.defaultAvatar;
    const url = currentProfile.profileImageUrl ?? '';
    return url.startsWith('data:') ? url : buildImageUrl(url, this.defaultAvatar);
  }


  onAvatarError(ev: Event) {
    (ev.target as HTMLImageElement).src = this.defaultAvatar;
  }

  goToLogin() {
    this.router.navigate(['/loginuser']);
  }

  goToRegister() {
    this.router.navigate(['/registeruser']);
  }

  goToProfile() {
    this.router.navigate(['/myprofile']);
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
    document.body.classList.toggle('overflow-hidden', this.isNavOpen && window.innerWidth < 1024);
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  closeUserMenu() {
    this.isUserMenuOpen = false;
  }

  logout() {
    this.authService.logout();
    this.userService.clearProfile();
    this.profile.set(null);
    this.router.navigate(['/']);
  }
}
