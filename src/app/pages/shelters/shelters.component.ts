import { Component } from '@angular/core';
import { SearchSheltersComponent } from "./components/search-shelters/search-shelters.component";
import { ListSheltersComponent } from "./components/list-shelters/list-shelters.component";
import { ShelterModel } from '../../core/modals/shelter.model';

@Component({
  selector: 'app-shelters',
  imports: [SearchSheltersComponent, ListSheltersComponent],
  templateUrl: './shelters.component.html',
  styleUrl: './shelters.component.css'
})
export class SheltersComponent {

  shelters: ShelterModel[] = [];

  //ARRAY de los refugios
  onSearchResults(results: ShelterModel[]) {
    this.shelters = results;
  }
}
