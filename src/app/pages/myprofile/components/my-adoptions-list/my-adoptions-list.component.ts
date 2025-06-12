import { Component, Input } from '@angular/core';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { AdoptionModel } from '../../../../core/modals/adoption.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UpdateAdoptionModalComponent } from "../update-adoption-modal/update-adoption-modal.component";

@Component({
  selector: 'app-my-adoptions-list',
  imports: [CommonModule, FormsModule, RouterModule, UpdateAdoptionModalComponent],
  templateUrl: './my-adoptions-list.component.html',
  styleUrl: './my-adoptions-list.component.css'
})
export class MyAdoptionsListComponent {

  listProfileAdoption!: Observable<AdoptionModel[]>;
  adoptions: AdoptionModel[] = [];
  @Input() userId!: number;
  
  selectedAdoptionId: number | null = null;
  showEditModal = false;


  constructor(private adoptionService: AdoptionService, private userService: UserService) {}

  ngOnInit(): void {
    this.listProfileAdoption = this.userService.listProfileAdoptionObs$;
    this.userService.getAdoptionByUser(0, 10);
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

  deleteAdoption(adoptionId: number): void{
    this.adoptionService.deleteAdoption(adoptionId).subscribe({
      next: () => {
        this.userService.getAdoptionByUser()
      }
    });
  }

  openEditModal(adoptionId: number): void {
    document.body.classList.add('overflow-hidden');
    this.selectedAdoptionId = adoptionId;
    this.showEditModal = true;
  }

  closeModal() {
    document.body.classList.remove('overflow-hidden');
    this.showEditModal = false;
    this.selectedAdoptionId = null;

    // refresca la lista para ver los cambios
    this.userService.getAdoptionByUser(0, 10);
  }

  // updateAdoption(adoptionId:number): void{
  //   this.adoptionService.updateAdoption(adoptionId)
  // }
}
