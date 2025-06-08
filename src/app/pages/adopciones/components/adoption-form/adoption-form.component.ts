import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-adoption-form',
  imports: [ FormsModule ],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent {
  @Output() closed = new EventEmitter<void>();

  adoption = {
    name: '',
    species: '',
    breed: '',
    age: 0,
    size: '',
    vaccinated: false,
    sterilized: false,
    forAdoption: true
  };

  selectedFile: File | null = null;

  constructor(private adoptionService: AdoptionService) {}

  async submitAdoption() {
    if (!this.adoption.name || !this.adoption.species) return;

    const formData = new FormData();
    formData.append('name', this.adoption.name);
    formData.append('species', this.adoption.species);
    formData.append('breed', this.adoption.breed);
    formData.append('age', this.adoption.age);
    formData.append('size', this.adoption.size);
    formData.append('vaccinated', this.adoption.vaccinated);
    formData.append('sterilized', this.adoption.sterilized);
    formData.append('forAdoption', this.adoption.forAdoption);



    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.log("Selecciona una imagen");
    }

    try {
      await this.adoptionService.createAdoption(formData);
      // await this.adoptionService.getAdoptions(0, 10);
      this.adoption = {
        name: '',
        species: '',
        breed: '',
        age: 0,
        size: '',
        vaccinated: false,
        sterilized: false,
        forAdoption: true
      };

      this.selectedFile = null;
      this.closeModal();

    } catch (error) {
      console.error(error)
    }
  }

  closeModal() {
    this.closed.emit();
  }
}
