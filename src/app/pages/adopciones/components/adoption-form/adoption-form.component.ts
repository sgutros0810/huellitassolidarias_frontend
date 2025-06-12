import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators  } from '@angular/forms';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-adoption-form',
  imports: [ AsyncPipe, FormsModule, ReactiveFormsModule ],
  templateUrl: './adoption-form.component.html',
  styleUrl: './adoption-form.component.css'
})
export class AdoptionFormComponent implements OnInit {
  @Output() closed = new EventEmitter<void>();
  form!: FormGroup;
  today: string = '';
  age: number | null = null;
  selectedFile: File | null = null;

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




  constructor(private adoptionService: AdoptionService,  private formBuilder: FormBuilder,) {}

  ngOnInit() {
    // this.today = new Date().toISOString().split('T')[0];
    this.form = this.formBuilder.group({
      name:           ['', Validators.required],
      species:        ['', Validators.required],
      gender:         ['', Validators.required],
      breed:          [''],
      size:           [''],
      birthDate:      ['', [Validators.required, this.maxDateValidator]],
      description:    ['', Validators.maxLength(1000)],
      location:       ['', Validators.maxLength(100)],
      vaccinated:     [false],
      sterilized:     [false],
      status:         ['AVAILABLE', Validators.required],
      contactPhone:   ['', Validators.pattern(/^[\d+\-\s]{7,15}$/)],
      contactEmail:   ['', Validators.email],
      forAdoption:    [true]
    });

    // recalcula la edad cuando cambie la fecha
    this.form.get('birthDate')!.valueChanges
      .subscribe(() => this.calculateAge());
  }

  //Valida que la fecha no sea posterior a hoy
  private maxDateValidator(control: AbstractControl): ValidationErrors | null {
    const v = control.value;
    if (!v) return null;
    return new Date(v) > new Date() ? { futureDate: true } : null;
  }


  calculateAge(): void {
    const bd = this.form.get('birthDate')!.value;
    if (!bd) {
      this.age = null;
      return;
    }
    const birth = new Date(bd);
    const today = new Date();
    let a = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      a--;
    }
    this.age = a;
  }

  onFileSelected(ev: Event): void {
    const input = ev.target as HTMLInputElement;
    this.selectedFile = input.files && input.files[0] || null;
  }

  async submitAdoption(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      formData.append(key, String(val));
    });
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    try {
      await this.adoptionService.createAdoption(formData);
      await this.adoptionService.getAdoptions(0, 10);
      this.closeModal();
    } catch (err) {
      console.error(err);
      alert('Error al publicar la adopción');
    }
  }

  closeModal(): void {
    this.closed.emit();
  }

}
