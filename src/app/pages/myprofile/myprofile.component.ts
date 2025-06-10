import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { UserProfileModel } from '../../core/modals/user.model';
import { MyPostsListComponent } from "./components/my-posts-list/my-posts-list.component";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { PostModel } from '../../core/modals/post.model';
import { MyAdoptionsListComponent } from "./components/my-adoptions-list/my-adoptions-list.component";

@Component({
  standalone: true,
  selector: 'app-myprofile',
  imports: [CommonModule, FormsModule, MyPostsListComponent, MyAdoptionsListComponent],
  templateUrl: './myprofile.component.html',
})
export class MyprofileComponent implements OnInit {

  profile: UserProfileModel | null = null;
  errorMessage: string | null = null;
  isEditing = false;
  selectedImage: File | null = null;
  activeTab: 'publicaciones' | 'adopciones' | 'reportes' = 'publicaciones';

  myPosts: PostModel[] = [];

  constructor(private userService: UserService, private postService: PostService, private router: Router){
  }

  ngOnInit(): void {

    this.userService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error cargando perfil', err);
        this.errorMessage = 'No se pudo cargar el perfil. Inténtalo de nuevo más tarde.';
      }
    });

    //Mis posts creados
    this.postService.getMyPosts().subscribe({
      next: (posts) => {
        this.myPosts = posts;
        this.errorMessage = null;
      },
      error: (err) => {
        console.error('Error cargando posts', err);
        this.errorMessage = 'No se pudo cargar tus posts. Inténtalo de nuevo más tarde.';
      }
    })
  }



  editProfile(): void {
    this.isEditing = true;
  }

  saveProfile() {
    if (!this.profile) {
      console.error("Error al cargar el perfil.");
      return;
    }
    if (this.profile.role === 'REFUGIO') {
      this.userService.updateShelterProfile(this.profile).subscribe({
        next: () => {
          this.isEditing = false;
        },
        error: (err) => {
          console.error('Error al actualizar perfil', err);
        }
      });
    } else {
      this.userService.updateUserProfile(this.profile).subscribe({
        next: () => {
          this.isEditing = false;
        },
        error: (err) => console.error('Error al actualizar usuario', err)
      });
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage)
  }


  uploadImage() {
    if (!this.selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedImage);

    this.userService.updateProfileImage(formData).subscribe({
      next: () => {
        this.refreshProfile(); // recarga datos con nueva URL
        this.selectedImage = null;
      },
      error: err => console.error('Error al subir imagen', err)
    });
  }


  refreshProfile() {
    this.userService.getProfile().subscribe({
      next: (data) => this.profile = data,
      error: (err) => console.error('Error al recargar perfil', err)
    });
  }

  setActiveTab(tab: 'publicaciones' | 'adopciones' | 'reportes') {
    this.activeTab = tab;
  }
}
