import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { AdoptionModel } from '../../../../core/modals/adoption.model';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { AdoptionDetailModel } from '../../../../core/modals/adoption-detail.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adoption-details',
  imports: [],
  templateUrl: './adoption-details.component.html',
  styleUrl: './adoption-details.component.css'
})
export class AdoptionDetailsComponent {

  private route = inject(ActivatedRoute);
  private adoptionService = inject(AdoptionService);

  adoption = signal<AdoptionDetailModel | null>(null);

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
