import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionModel } from '../../../../core/modals/adoption.model';
import { AdoptionService } from '../../../../core/services/adoption.service';

@Component({
  selector: 'app-filter',
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit{

  adoptionList!: Observable<AdoptionModel[]>;
  allAdoptions: AdoptionModel[] = [];
  filterAdoptions: AdoptionModel[] = [];

  filterSpecies: string = '';
  filterCity: string = '';
  filterGender: string = '';
  filterSize: string = '';

  constructor(private adoptionService: AdoptionService) {

  }

  ngOnInit(): void {
    this.adoptionService.listAdoptionObs$.subscribe(adoptions => {
      this.allAdoptions = adoptions;
      this.applyFilters();
    });

    this.adoptionService.getAdoptions(0, 10);
  }

  // Aplicar filtros
  applyFilters(){
    this.filterAdoptions = this.allAdoptions.filter(adoption => {
      return (
        (!this.filterSpecies || adoption.species.toLowerCase() === this.filterSpecies.toLowerCase()) &&
        (!this.filterCity || (adoption.location && adoption.location.toLowerCase().includes(this.filterCity.toLowerCase()))) &&
        (!this.filterGender || adoption.gender.toLowerCase() === this.filterGender.toLowerCase()) &&
        (!this.filterSize || (adoption.size && adoption.size.toLowerCase() === this.filterSize.toLowerCase()))
      );
    });
  }


  // Actualiza los filtros en el html
  updateFilter(filterName: string, value: string) {
    switch (filterName) {
      case 'species':
        this.filterSpecies = value;
        break;
      case 'city':
        this.filterCity = value;
        break;
      case 'gender':
        this.filterGender = value;
        break;
      case 'size':
        this.filterSize = value;
        break;
    }
    this.applyFilters();
  }

}
