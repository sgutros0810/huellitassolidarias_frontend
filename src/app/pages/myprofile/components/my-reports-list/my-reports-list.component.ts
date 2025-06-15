import { Component, OnInit, inject } from '@angular/core';
import { AnimalReportService } from '../../../../core/services/animal-report.service';
import { AnimalReportModel } from '../../../../core/models/animal-report.model';
import {CardReportComponent} from '../../../reportes/components/card-report/card-report.component';

@Component({
  selector: 'app-my-reports-list',
  templateUrl: './my-reports-list.component.html',
  imports: [
    CardReportComponent
  ]
})
export class MyReportsListComponent implements OnInit {
  private animalReportService = inject(AnimalReportService);
  reports: AnimalReportModel[] = [];
  loading = false;

  ngOnInit() {
    this.load();
    this.animalReportService.animalReportsObs$.subscribe(data => {
      this.reports = data.filter(r => r.state === 'MISSING');
    })
  }

  async load() {
    this.loading = true;
    await this.animalReportService.getMyReports();
    this.loading = false;
  }

  async markFound(report: AnimalReportModel) {
    await this.animalReportService.updateReportState(report.id, 'FOUND');
    await this.load();
  }
}
