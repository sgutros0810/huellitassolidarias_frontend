import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { PostService } from '../../core/services/post.service';

import { UserProfileModel } from '../../core/models/user.model';
import { City } from '../../core/models/enums/city.enum';

import { MyPostsListComponent } from './components/my-posts-list/my-posts-list.component';
import { MyAdoptionsListComponent } from './components/my-adoptions-list/my-adoptions-list.component';
import { MyReportsListComponent } from './components/my-reports-list/my-reports-list.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { buildImageUrl } from '../../shared/utils/image-url.util';
import {PostModel} from '../../core/models/post.model';

@Component({
  standalone: true,
  selector: 'app-myprofile',
  imports: [
    CommonModule,
    FormsModule,
    MyPostsListComponent,
    MyAdoptionsListComponent,
    MyReportsListComponent,
    ToastComponent
  ],
  templateUrl: './myprofile.component.html',
})
export class MyprofileComponent implements OnInit {
  @ViewChild(ToastComponent) toastComponent?: ToastComponent;

  profile: UserProfileModel | null = null;
  isEditing = false;
  selectedImage: File | null = null;
  activeTab: 'publicaciones' | 'adopciones' | 'reportes' = 'publicaciones';
  cities = Object.entries(City);
  defaultAvatar = '/img/avatar-default.png';

  private originalImageUrl: string | null = null;
  private myPosts: PostModel[] | undefined;
  verificationRequested = false;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router
  ) {}

  get imageSrc(): string {
    if (!this.profile) return this.defaultAvatar;
    const url = this.profile.profileImageUrl ?? '';
    return url.startsWith('data:')
      ? url
      : buildImageUrl(url, this.defaultAvatar);
  }

  onAvatarError(event: Event) {
    (event.target as HTMLImageElement).src = this.defaultAvatar;
  }

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: data => {
        this.profile = data;
        this.verificationRequested = data.verificationRequested;
      },
      error: err => console.error('Error cargando perfil', err)
    });

    this.postService.getMyPosts().subscribe({
      next: posts => {
        this.myPosts = posts;

        },
      error: err => console.error('Error cargando posts', err)
    });
  }

  editProfile(): void {
    this.isEditing = true;
    this.originalImageUrl = this.profile?.profileImageUrl ?? null;
  }

  saveProfile(): void {
    if (!this.profile) return;

    const imageToUpload = this.selectedImage;
    const finish = () => {
      this.isEditing     = false;
      this.selectedImage = null;
      this.userService.getProfile().subscribe();
      if (this.toastComponent) {
        this.toastComponent.message = 'Perfil actualizado correctamente';
        this.toastComponent.show();
      }
    };

    const update$ = this.profile.role === 'REFUGIO'
      ? this.userService.updateShelterProfile(this.profile)
      : this.userService.updateUserProfile(this.profile);

    update$.pipe(
      switchMap(() => {
        if (imageToUpload) {
          const fd = new FormData();
          fd.append('image', imageToUpload);
          return this.userService.updateProfileImage(fd);
        }
        return of(null);
      })
    ).subscribe({
      next: finish,
      error: err => console.error('Error al guardar', err)
    });
  }

  cancelEdit(): void {
    this.isEditing     = false;
    this.selectedImage = null;
    if (this.profile) {
      this.profile.profileImageUrl = this.originalImageUrl!;
      this.userService.emitProfile(this.profile);
    }
  }

  requestVerification() {
    this.userService.requestShelterVerification().subscribe({
      next: () => {
        this.verificationRequested = true;
        if (this.toastComponent) {
          this.toastComponent.message = 'Solicitud de verificacion enviada correctamente';
          this.toastComponent.show();
        }
      },
      error: () => {
        if (this.toastComponent) {
          this.toastComponent.message = 'Error al mandar solicitud de verificacion';
          this.toastComponent.show();
        }
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file || !this.profile) return;

    this.selectedImage = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.profile!.profileImageUrl = reader.result as string;
      this.userService.emitProfile(this.profile!);
    };
    reader.readAsDataURL(file);
  }

  setActiveTab(tab: 'publicaciones' | 'adopciones' | 'reportes') {
    this.activeTab = tab;
  }
}
