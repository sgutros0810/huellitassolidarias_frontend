import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AdoptionModel } from '../../../../core/models/adoption.model';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { AdoptionDetailModel } from '../../../../core/models/adoption-detail.model';
import { ActivatedRoute } from '@angular/router';
import {TitleCasePipe} from '@angular/common';
import {buildImageUrl} from '../../../../shared/utils/image-url.util';

@Component({
  selector: 'app-adoption-details',
  imports: [
    TitleCasePipe
  ],
  templateUrl: './adoption-details.component.html',
  styleUrl: './adoption-details.component.css'
})
export class AdoptionDetailsComponent {

  private route = inject(ActivatedRoute);
  private adoptionService = inject(AdoptionService);

  adoption = signal<AdoptionDetailModel | null>(null);

  defaultAdoptionImage = '/img/adopciones/default-adoption.jpg';

  speciesMap: Record<string, string> = {
    DOG: 'Perro',
    CAT: 'Gato',
    RABBIT: 'Conejo',
    HAMSTER: 'Hámster',
    GUINEA_PIG: 'Cobayo',
    FERRET: 'Hurón',
    MOUSE: 'Ratón',
    RAT: 'Rata',
    CHINCHILLA: 'Chinchilla',
    HEDGEHOG: 'Erizo',
    TURTLE: 'Tortuga',
    TORTOISE: 'Tortuga terrestre',
    IGUANA: 'Iguana',
    LIZARD: 'Lagarto',
    SNAKE: 'Serpiente',
    BIRD: 'Ave',
    PARROT: 'Loro',
    CANARY: 'Canario',
    PIGEON: 'Paloma',
    CHICKEN: 'Gallina',
    DUCK: 'Pato',
    FISH: 'Pez',
    OTHER: 'Otro'
  };

  genderMap: Record<string, string> = {
    MALE: 'Macho',
    FEMALE: 'Hembra',
    UNKNOWN: 'Desconocido'
  };

  statusMap: Record<string, string> = {
    AVAILABLE: 'Disponible',
    RESERVED: 'Reservado',
    ADOPTED: 'Adoptado',
    UNDER_REVIEW: 'En revisión'
  };


  today: string = '';
  age: number | null = null;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log('id del animal:', id);

    this.adoptionService.getAdoptionById(id).subscribe({
      next: (response) => {
        this.adoption.set(response);
        // console.log(response);
      },
      error: (err) => console.error('Error cargando datos del animal', err)
    });
  }

  getImageSrc(imageUrl: string | null | undefined): string {
    return buildImageUrl(imageUrl, this.defaultAdoptionImage);
  }

  // Traducir true o false a si o no
  translateBoolean(value: boolean | null | undefined): string {
    return value ? 'Sí' : 'No';
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
