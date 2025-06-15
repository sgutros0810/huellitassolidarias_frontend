import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import {AnimalReportModel} from '../../../core/models/animal-report.model';
import { ToastComponent } from '../../../shared/components/toast/toast.component';
import { ModalConfirmComponent } from '../../../shared/components/modal-confirm/modal-confirm.component';
import {buildImageUrl} from '../../../shared/utils/image-url.util';

@Component({
  standalone: true,
  selector: 'app-admin-reports',
  imports: [CommonModule, FormsModule, ToastComponent, ModalConfirmComponent],
  templateUrl: './admin-reports.component.html',
})
export class AdminReportsComponent implements OnInit {
  @ViewChild('toast') toast?: ToastComponent;

  reports: AnimalReportModel[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  search = '';
  private searchTimeout: any;

  modalOpen = false;
  selectedId: number | null = null;
  selectedName = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.adminService.getAllReports(this.page, this.size, this.search).subscribe(res => {
      this.reports = res.content;
      this.totalPages = res.totalPages;
    });
  }

  onSearchChanged(): void {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.loadReports(), 300);
  }

  changePage(offset: number): void {
    this.page += offset;
    this.loadReports();
  }

  confirmDelete(id: number, name: string) {
    this.modalOpen = true;
    this.selectedId = id;
    this.selectedName = name;
  }

  onConfirmDelete() {
    if (!this.selectedId) return;
    this.adminService.deleteReport(this.selectedId).subscribe(() => {
      this.reports = this.reports.filter(r => r.id !== this.selectedId);
      this.toast?.show(2000);
      this.modalOpen = false;
    });
  }

  onCancelDelete() {
    this.modalOpen = false;
    this.selectedId = null;
    this.selectedName = '';
  }

  protected readonly buildImageUrl = buildImageUrl;
}
