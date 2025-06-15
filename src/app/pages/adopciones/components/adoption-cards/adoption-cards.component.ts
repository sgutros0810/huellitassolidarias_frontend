import {Component, Input, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionModel } from '../../../../core/models/adoption.model';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {buildImageUrl} from '../../../../shared/utils/image-url.util';

@Component({
  selector: 'app-cards',
  imports: [ CommonModule, FormsModule, RouterModule],
  templateUrl: './adoption-cards.component.html',
  styleUrl: './adoption-cards.component.css'
})
export class AdoptionCardsComponent{

  @Input() adoptions: AdoptionModel[] = [];

  defaultAdoptionImage = '/img/adopciones/default-adoption.jpg';

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


  getImageSrc(imageUrl: string | null | undefined): string {
    return buildImageUrl(imageUrl, this.defaultAdoptionImage);
  }

  getSpeciesLabel(species: string): string {
    const match = this.speciesOptions.find(s => s.value === species);
    return match ? match.label : species;
  }


  // Calcula la edad del animal
  calculateAge(birthDateStr: string): string {
    const birthDate = new Date(birthDateStr);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      // cantidad de días del mes anterior
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    let ageStr = '';
    if (years > 0) ageStr += years + (years === 1 ? ' año' : ' años');
    if (months > 0) ageStr += (ageStr ? ', ' : '') + months + (months === 1 ? ' mes' : ' meses');
    if (days > 0) ageStr += (ageStr ? ' y ' : '') + days + (days === 1 ? ' día' : ' días');

    return ageStr || '0 días';
  }


}
