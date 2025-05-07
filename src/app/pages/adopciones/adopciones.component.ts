import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { CardsComponent } from "./components/cards/cards.component";
import { FilterComponent } from "./components/filter/filter.component";

@Component({
  selector: 'app-adopciones',
  imports: [NavbarComponent, CardsComponent, FilterComponent],
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.css'
})
export class AdopcionesComponent {

}
