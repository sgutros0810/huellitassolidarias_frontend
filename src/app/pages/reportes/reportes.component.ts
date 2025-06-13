import {Component, OnInit} from '@angular/core';
import { CardReportComponent } from "./components/card-report/card-report.component";
import { FilterComponent } from "../adopciones/components/filter/filter.component";

import {AnimalReportService} from '../../core/services/animal-report.service';
import { ReportFormComponent } from "./components/report-form/report-form.component";
import { AnimalReportModel } from '../../core/modals/animal-report.model';

@Component({
  selector: 'app-reportes',
  imports: [CardReportComponent, FilterComponent, ReportFormComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  reports: AnimalReportModel[] = [];
  page = 0;
  size = 10;
  loading = false;
  filterState = '';
  searchQuery = '';

  constructor(private animalReportService: AnimalReportService) {}

  ngOnInit() {
    this.loadReports();
    this.animalReportService.animalReportsObs$.subscribe(data => {
      this.reports = data;
    });
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

    showCreateModal = false;

  openCreateModal() {
    document.body.classList.add('overflow-hidden');
    this.showCreateModal = true;
  }

  closeModal() {
    document.body.classList.remove('overflow-hidden');
    this.showCreateModal = false;
  }

}
