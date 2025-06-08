import { Component } from '@angular/core';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { CardsComponent } from "./components/cards/cards.component";
import { FilterComponent } from "./components/filter/filter.component";
import { AdoptionFormComponent } from "./components/adoption-form/adoption-form.component";

@Component({
  selector: 'app-adopciones',
  imports: [NavbarComponent, CardsComponent, FilterComponent, AdoptionFormComponent],
  templateUrl: './adopciones.component.html',
  styleUrl: './adopciones.component.css'
})
export class AdopcionesComponent {

  showCreateModal = false;

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
  }

}


// this.adoptionService.createAdoption(formValue).then(res => {
//   console.log(res);
//   alert('Adopción creada');
// }).catch(err => {
//   console.error(err);
//   alert('Error al crear adopción');
// });
