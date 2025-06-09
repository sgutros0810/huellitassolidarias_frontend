import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-adoption-form',
  imports: [ AsyncPipe, FormsModule  ],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();

  today: string = '';
  age: number | null = null;

  adoption = {
    name: '',
    species: '',
    gender: '',
    breed: '',
    birthDate: '',
    size: '',
    description: '',
    location: '',
    vaccinated: false,
    sterilized: false,
    status: 'AVAILABLE',
    contactPhone: '',
    contactEmail: '',
    forAdoption: true
  };

  // GENERO
  genders = [
    { value: 'MALE', label: 'Macho' },
    { value: 'FEMALE', label: 'Hembra' },
    { value: 'UNKNOWN', label: 'Desconocido' }
  ];


  speciesOptions =
  [
    { value: 'DOG', label: 'Perro' },
    { value: 'CAT', label: 'Gato' },
    { value: 'RABBIT', label: 'Conejo' },
    { value: 'HAMSTER', label: 'Hámster' },
    { value: 'GUINEA_PIG', label: 'Cobayo' },
    { value: 'FERRET', label: 'Hurón' },
    { value: 'MOUSE', label: 'Ratón' },
    { value: 'RAT', label: 'Rata' },
    { value: 'GERBIL', label: 'Jerbo' },
    { value: 'CHINCHILLA', label: 'Chinchilla' },
    { value: 'HEDGEHOG', label: 'Erizo' },
    { value: 'HORSE', label: 'Caballo' },
    { value: 'DONKEY', label: 'Burro' },
    { value: 'PONY', label: 'Poni' },
    { value: 'COW', label: 'Vaca' },
    { value: 'PIG', label: 'Cerdo' },
    { value: 'GOAT', label: 'Cabra' },
    { value: 'SHEEP', label: 'Oveja' },
    { value: 'LLAMA', label: 'Llama' },
    { value: 'ALPACA', label: 'Alpaca' },
    { value: 'MONKEY', label: 'Mono' },
    { value: 'PARROT', label: 'Loro' },
    { value: 'CANARY', label: 'Canario' },
    { value: 'PIGEON', label: 'Paloma' },
    { value: 'DOVE', label: 'Tórtola' },
    { value: 'CHICKEN', label: 'Gallina' },
    { value: 'DUCK', label: 'Pato' },
    { value: 'GOOSE', label: 'Ganso' },
    { value: 'TURKEY', label: 'Pavo' },
    { value: 'REPTILE', label: 'Reptil' },
    { value: 'SNAKE', label: 'Serpiente' },
    { value: 'TURTLE', label: 'Tortuga' },
    { value: 'TORTOISE', label: 'Tortuga terrestre' },
    { value: 'IGUANA', label: 'Iguana' },
    { value: 'GECKO', label: 'Geco' },
    { value: 'LIZARD', label: 'Lagarto' },
    { value: 'FROG', label: 'Rana' },
    { value: 'TOAD', label: 'Sapo' },
    { value: 'FISH', label: 'Pez' },
    { value: 'BETTA', label: 'Pez Betta' },
    { value: 'GOLDFISH', label: 'Pez Dorado' },
    { value: 'KOI', label: 'Pez Koi' },
    { value: 'OTHER_BIRD', label: 'Otra ave' },
    { value: 'OTHER_MAMMAL', label: 'Otro mamífero' },
    { value: 'OTHER_REPTILE', label: 'Otro reptil' },
    { value: 'OTHER_AMPHIBIAN', label: 'Otro anfibio' },
    { value: 'OTHER_AQUATIC', label: 'Otro acuático' },
    { value: 'EXOTIC', label: 'Exótico' },
    { value: 'OTHER', label: 'Otro' }
  ];


  selectedFile: File | null = null;

  constructor(private adoptionService: AdoptionService) {}

  ngOnInit() {
    this.today = new Date().toISOString().split('T')[0];
  }

  async submitAdoption() {
    if (!this.adoption.name || !this.adoption.species || !this.adoption.gender) return;

    const formData = new FormData();
    formData.append('name', this.adoption.name);
    formData.append('species', this.adoption.species);
    formData.append('gender', this.adoption.gender);
    formData.append('breed', this.adoption.breed);
    formData.append('birthDate', this.adoption.birthDate);
    formData.append('size', this.adoption.size);
    formData.append('description', this.adoption.description);
    formData.append('location', this.adoption.location);
    formData.append('vaccinated', this.adoption.vaccinated.toString());
    formData.append('sterilized', this.adoption.sterilized.toString());
    formData.append('status', this.adoption.status);
    formData.append('contactPhone', this.adoption.contactPhone);
    formData.append('contactEmail', this.adoption.contactEmail);
    formData.append('forAdoption', this.adoption.forAdoption.toString());


    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.log("Selecciona una imagen");
    }


    try {
      await this.adoptionService.createAdoption(formData);
      await this.adoptionService.getAdoptions(0, 10);

      //Reseta los campos del formulario
      this.resetForm();

      this.closeModal();

    } catch (error) {
      console.error(error)
    }
  }

  closeModal() {
    this.closed.emit();
  }

  onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  //Calcular edad
  calculateAge() {
    if (this.adoption.birthDate) {
      const birthDate = new Date(this.adoption.birthDate);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      this.age = age;
    } else {
      this.age = null;
    }
  }

  resetForm() {
    this.adoption = {
      name: '',
      species: '',
      gender: '',
      breed: '',
      birthDate: '',
      size: '',
      description: '',
      location: '',
      vaccinated: false,
      sterilized: false,
      status: 'AVAILABLE',
      contactPhone: '',
      contactEmail: '',
      forAdoption: true
    };
    this.selectedFile = null;
    this.age = null;
  }


}
