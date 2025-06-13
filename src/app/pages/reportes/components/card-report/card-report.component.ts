import {Component, Input} from '@angular/core';
import { AnimalReportModel } from '../../../../core/modals/animal-report.model';

@Component({
  selector: 'app-card-report',
  imports: [],
  templateUrl: './card-report.component.html',
  styleUrl: './card-report.component.css'
})
export class CardReportComponent {
  @Input() report!: AnimalReportModel;
}
