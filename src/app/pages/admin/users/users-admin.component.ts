import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ToastComponent} from '../../../shared/components/toast/toast.component';
import {UserAdminResponse} from '../../../core/models/user-admin-response';
import {AdminService} from '../../../core/services/admin.service';
import {ModalConfirmComponent} from '../../../shared/components/modal-confirm/modal-confirm.component';

@Component({
  standalone: true,
  selector: 'app-users-admin',
  imports: [CommonModule, FormsModule, ToastComponent, ModalConfirmComponent],
  templateUrl: './users-admin.component.html',
})
export class UsersAdminComponent implements OnInit {
  @ViewChild('toast') toast?: ToastComponent;

  users: UserAdminResponse[] = [];
  loading = false;

  page = 0;
  size = 10;
  totalPages = 0;

  selectedRole: string = '';
  onlyVerified: string = '';
  onlyActive: string = '';
  search: string = '';
  private searchTimeout: any;

  modalOpen = false;
  shelterName = '';
  shelterId: number | null = null;

  deleteModalOpen = false;
  userToDelete: UserAdminResponse | null = null;


  openModal(name: string = '', id?: number) {
    this.modalOpen = true;
    this.shelterName = name;
    this.shelterId = id ?? null;
  }
  openDeleteModal(user: UserAdminResponse) {
    this.userToDelete = user;
    this.deleteModalOpen = true;
  }


  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;

    const params: any = {
      page: this.page,
      size: this.size,
    };

    if (this.selectedRole) params.role = this.selectedRole;
    if (this.onlyVerified === 'pending') {
      params.verified = false;
      params.verificationRequested = true;
      params.role = 'REFUGIO';
    } else if (this.onlyVerified) {
      params.verified = this.onlyVerified === 'true';
    }


    if (this.onlyActive) params.active = this.onlyActive === 'true';
    if (this.search?.trim()) params.search = this.search.trim();

    this.adminService.listUsers(params.page, params.size, params.role, params.verified, params.active, params.search)
      .subscribe({
        next: (res) => {
          this.users = res.content;
          this.totalPages = res.totalPages;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }


  onSearchChanged(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.loadUsers();
    }, 200);
  }

  changePage(offset: number) {
    this.page += offset;
    this.loadUsers();
  }

  toggleActive(user: UserAdminResponse) {
    this.adminService.toggleActive(user.id).subscribe(() => {
      user.active = !user.active;
      this.toast?.show(2000);
    });
  }

  updateRole(user: UserAdminResponse, newRole: string) {
    if (user.role === newRole) return;
    this.adminService.updateRole(user.id, newRole as any).subscribe(() => {
      user.role = newRole as any;
      this.toast?.show(2000);
    });
  }

  verifyShelter(user: UserAdminResponse) {
    this.adminService.verifyShelter(user.id).subscribe(() => {
      user.verified = true;
      user.verificationRequested = false;
      this.toast?.show(2000);
    });
  }



  confirmDeleteUser() {
    if (!this.userToDelete) return;

    this.adminService.deleteUser(this.userToDelete.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== this.userToDelete?.id);

      if (this.toast) {
        this.toast.message = `Usuario eliminado correctamente`;
        this.toast.show();
      }

      this.deleteModalOpen = false;
      this.userToDelete = null;
    });
  }


  onConfirmVerify() {
    if (this.shelterId) {
      this.adminService.verifyShelter(this.shelterId).subscribe(() => {
        const user = this.users.find(u => u.id === this.shelterId);
        if (user) {
          user.verified = true;
          user.verificationRequested = false;
        }

        if (this.toast) {
          this.toast.message = 'Perfil verificado correctamente';
          this.toast.show();
        }

        this.modalOpen = false;
        this.shelterId = null;
        this.shelterName = '';
      });
    }
  }


  onCancelVerify() {
    this.modalOpen = false;
  }
}
