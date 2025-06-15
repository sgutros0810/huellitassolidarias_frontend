import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionModel } from '../../../../core/models/adoption.model';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { City } from '../../../../core/models/enums/city.enum';
import { Species } from '../../../../core/models/enums/species.enum';
import { Gender } from '../../../../core/models/enums/gender.enum';
import { Size } from '../../../../core/models/enums/size.enum';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-filter',
  templateUrl: './adoption-filter.component.html',
  styleUrl: './adoption-filter.component.css',
  standalone: true,
  imports: [
    TitleCasePipe
  ]
})
export class AdoptionFilterComponent implements OnInit {

  @Output() filtered = new EventEmitter<AdoptionModel[]>();

  cities = Object.values(City);
  speciesList = Object.values(Species);
  genderList = Object.values(Gender);
  sizeList = Object.values(Size);

  adoptionList!: Observable<AdoptionModel[]>;
  allAdoptions: AdoptionModel[] = [];
  filterAdoptions: AdoptionModel[] = [];

  filterSpecies: string = '';
  filterCity: string = '';
  filterGender: string = '';
  filterSize: string = '';

  speciesOptions = [
    { value: 'DOG', label: 'Perro' },
    { value: 'CAT', label: 'Gato' },
    { value: 'RABBIT', label: 'Conejo' },
    { value: 'HAMSTER', label: 'Hámster' },
    { value: 'GUINEA_PIG', label: 'Cobayo' },
    { value: 'FERRET', label: 'Hurón' },
    { value: 'MOUSE', label: 'Ratón' },
    { value: 'RAT', label: 'Rata' },
    { value: 'CHINCHILLA', label: 'Chinchilla' },
    { value: 'HEDGEHOG', label: 'Erizo' },
    { value: 'TURTLE', label: 'Tortuga' },
    { value: 'TORTOISE', label: 'Tortuga terrestre' },
    { value: 'IGUANA', label: 'Iguana' },
    { value: 'LIZARD', label: 'Lagarto' },
    { value: 'SNAKE', label: 'Serpiente' },
    { value: 'BIRD', label: 'Ave' },
    { value: 'PARROT', label: 'Loro' },
    { value: 'CANARY', label: 'Canario' },
    { value: 'PIGEON', label: 'Paloma' },
    { value: 'CHICKEN', label: 'Gallina' },
    { value: 'DUCK', label: 'Pato' },
    { value: 'FISH', label: 'Pez' },
    { value: 'OTHER', label: 'Otro' }
  ];


  constructor(private adoptionService: AdoptionService) {}

  ngOnInit(): void {
    this.adoptionService.listAdoptionObs$.subscribe(adoptions => {
      this.allAdoptions = adoptions;
      this.applyFilters();
    });

    this.adoptionService.getAdoptions(0, 10);
  }

  applyFilters(): void {
    this.filterAdoptions = this.allAdoptions.filter(adoption => {
      return (
        (!this.filterSpecies || adoption.species === this.filterSpecies) &&
        (!this.filterCity || adoption.city === this.filterCity) &&
        (!this.filterGender || adoption.gender === this.filterGender) &&
        (!this.filterSize || adoption.size === this.filterSize)
      );
    });

    this.filtered.emit(this.filterAdoptions);
  }

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
