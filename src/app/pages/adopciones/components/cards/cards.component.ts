import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptionModel } from '../../../../core/modals/adoption.model';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { UserService } from '../../../../core/services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cards',
  imports: [ CommonModule, FormsModule, RouterModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent implements OnInit{

  adoptionList!: Observable<AdoptionModel[]>;
  adoptions: AdoptionModel[] = [];

  today: string = '';
  age: number | null = null;
  constructor(private adoptionService: AdoptionService, private userService: UserService) {}

  ngOnInit(): void {
    this.adoptionList = this.adoptionService.listAdoptionObs$;
    this.adoptionService.getAdoptions(0, 10);
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
