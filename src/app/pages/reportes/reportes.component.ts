import { Component } from '@angular/core';
import { CardsComponent } from "../adopciones/components/cards/cards.component";
import { CardReportComponent } from "./components/card-report/card-report.component";
import { FilterComponent } from "../adopciones/components/filter/filter.component";

@Component({
  selector: 'app-reportes',
  imports: [CardsComponent, CardReportComponent, FilterComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

}
