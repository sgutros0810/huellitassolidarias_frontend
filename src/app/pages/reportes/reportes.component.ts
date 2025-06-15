import {Component, inject, OnInit} from '@angular/core';
import { CardReportComponent } from "./components/card-report/card-report.component";
import { AdoptionFilterComponent } from "../adopciones/components/adoption-filter/adoption-filter.component";

import {AnimalReportService} from '../../core/services/animal-report.service';
import { ReportFormComponent } from "./components/report-form/report-form.component";
import { AnimalReportModel } from '../../core/models/animal-report.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {LoginPromptModalComponent} from '../../shared/components/login-prompt-modal/login-prompt-modal.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [CardReportComponent, ReportFormComponent, LoginPromptModalComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);

  reports: AnimalReportModel[] = [];
  page = 0;
  size = 10;
  loading = false;
  filterState = '';
  searchQuery = '';

  showLoginPrompt  = false;
  showCreateModal  = false;

  form!: FormGroup;
  showModal = false;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private animalReportService: AnimalReportService) {}

  ngOnInit() {
    this.loadReports();
    this.animalReportService.animalReportsObs$.subscribe(data => {
      this.reports = data.filter(r => r.state === "MISSING");
    });
  }

  openCreateModal() {
    if (!this.auth.isUserLogged()) {
      this.showLoginPrompt = true;
      document.body.classList.add('overflow-hidden');
      return;
    }
    this.showCreateModal = true;
    document.body.classList.add('overflow-hidden');
  }

  closeCreateModal() {
    this.showCreateModal = false;
    document.body.classList.remove('overflow-hidden');
  }

  closeLoginPrompt() {
    this.showLoginPrompt = false;
    document.body.classList.remove('overflow-hidden');
  }


  async loadReports() {
    this.loading = true;
    if (this.filterState) {
      await this.animalReportService.getReportsByState(this.filterState, this.page, this.size);
    } else {
      await this.animalReportService.getAllReports(this.page, this.size);
    }
    this.loading = false;
  }

  onSearch(query: string) {
    this.page = 0;
    this.searchQuery = query;
    this.loadReports();
  }

  onFilterState(state: string) {
    this.page = 0;
    this.filterState = state;
    this.loadReports();
  }

  changePage(newPage: number) {
    this.page = newPage;
    this.loadReports();
  }


  goToLogin() {
    this.router.navigate(['loginuser']);
  }
}
