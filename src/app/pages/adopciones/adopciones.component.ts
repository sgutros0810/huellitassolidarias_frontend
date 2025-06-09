import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { CardsComponent } from "./components/cards/cards.component";
import { FilterComponent } from "./components/filter/filter.component";
import { AdoptionFormComponent } from "./components/adoption-form/adoption-form.component";

@Component({
  selector: 'app-adopciones',
  imports: [ CardsComponent, FilterComponent, AdoptionFormComponent],
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.css'
})
export class AdopcionesComponent {

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
