import {Component, EventEmitter, Input, Output} from '@angular/core';
import { AnimalReportModel } from '../../../../core/models/animal-report.model';
import {environment} from '../../../../../environments/environment';
import {buildImageUrl} from '../../../../shared/utils/image-url.util';

@Component({
  selector: 'app-card-report',
  imports: [],
  templateUrl: './card-report.component.html',
  styleUrl: './card-report.component.css'
})
export class CardReportComponent {
  @Input() report!: AnimalReportModel;

  @Input() showMarkAsFound = false;
  @Output() markAsFound = new EventEmitter<AnimalReportModel>();

  defaultImg = '/img/cobaya.jpg';


  get imageSrc(): string {
    return buildImageUrl(this.report.imageUrl, this.defaultImg);
  }

  onMark() {
    this.markAsFound.emit(this.report);
  }
}
