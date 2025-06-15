import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import { AdminService } from '../../../core/services/admin.service';
import { AdoptionModel } from '../../../core/models/adoption.model';
import {AdoptionDetailModel} from '../../../core/models/adoption-detail.model';
import {buildImageUrl} from '../../../shared/utils/image-url.util';

@Component({
  standalone: true,
  selector: 'app-admin-adoptions',
  imports: [CommonModule, FormsModule, ToastComponent, ModalConfirmComponent],
  templateUrl: './admin-adoptions.component.html',
})
export class AdminAdoptionsComponent implements OnInit {
  @ViewChild('toast') toast?: ToastComponent;

  adoptions: AdoptionDetailModel[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  search = '';
  private searchTimeout: any;

  modalOpen = false;
  selectedId: number | null = null;
  selectedName = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadAdoptions();
  }

  loadAdoptions() {
    this.adminService.getAllAdoptions(this.page, this.size, this.search).subscribe({
      next: (res) => {
        this.adoptions = res.content;
        this.totalPages = res.totalPages;
      },
    });
  }

  onSearchChanged(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.loadAdoptions(), 200);
  }

  changePage(offset: number) {
    this.page += offset;
    this.loadAdoptions();
  }

  confirmDelete(id: number, name: string) {
    this.modalOpen = true;
    this.selectedId = id;
    this.selectedName = name;
  }

  onConfirmDelete() {
    if (!this.selectedId) return;
    this.adminService.deleteAdoption(this.selectedId).subscribe(() => {
      this.adoptions = this.adoptions.filter(a => a.id !== this.selectedId);
      this.toast?.show(2000);
      this.modalOpen = false;
      this.selectedId = null;
      this.selectedName = '';
    });
  }

  onCancelDelete() {
    this.modalOpen = false;
    this.selectedId = null;
    this.selectedName = '';
  }

  protected readonly buildImageUrl = buildImageUrl;
}
