import {AsyncPipe, TitleCasePipe} from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AdoptionService } from '../../../../core/services/adoption.service';
import { AdoptionDetailModel } from '../../../../core/models/adoption-detail.model';
import {City} from '../../../../core/models/enums/city.enum';

@Component({
  selector: 'app-update-adoption-modal',
  imports: [FormsModule, ReactiveFormsModule, TitleCasePipe],
  templateUrl: './update-adoption-modal.component.html',
  styleUrl: './update-adoption-modal.component.css'
})
export class UpdateAdoptionModalComponent implements OnInit {

  @Input() adoptionId!: number;
  @Output() closed = new EventEmitter<void>();

  form!: FormGroup;
  today: string = new Date().toISOString().split('T')[0];
  age: number | null = null;
  selectedFile: File | null = null;
  currentImageUrl: string | null = null;
  cities = Object.values(City);

  adoption = {
    name: '',
    species: '',
    gender: '',
    breed: '',
    birthDate: '',
    // size: '',
    description: '',
    city: '',
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
      name:         ['', Validators.required],
      species:      ['', Validators.required],
      gender:       ['', Validators.required],
      breed:        [''],
      birthDate:    ['', [Validators.required, this.maxDateValidator]],
      description:  ['', Validators.maxLength(1000)],
      city: ['', Validators.required],
      vaccinated:   [false],
      sterilized:   [false],
      status:       ['AVAILABLE', Validators.required],
      contactPhone: ['', Validators.pattern(/^[\d+\-\s]{7,15}$/)],
      contactEmail: ['', Validators.email],
      forAdoption:  [true],
      image:        [null]
    });

    // recalcula la edad cuando cambie la fecha
    this.form.get('birthDate')!.valueChanges.subscribe(() => this.calculateAge());

    //Pone los datos que tiene guardado
    this.adoptionService.getAdoptionById(this.adoptionId).subscribe({
      next: (data: AdoptionDetailModel) => {

        // Si tiene ya una imagen  imagen, la guarda
        this.currentImageUrl = data.imageUrl ? `/uploads/adoptions/${data.imageUrl}` : null;

        // Parchea todos los campos, la imagen no
        this.form.patchValue({
          name:         data.name,
          species:      data.species,
          gender:       data.gender,
          breed:        data.breed,
          size:         data.size,
          birthDate:    data.birthDate,
          description:  data.description,
          city:     data.city,
          vaccinated:   data.vaccinated,
          sterilized:   data.sterilized,
          status:       data.status,
          contactPhone: data.contactPhone,
          contactEmail: data.contactEmail,
          forAdoption:  data.status === 'AVAILABLE'
        });

        // Edad inicial
        this.calculateAge();
      },
      error: err => console.error('Error cargando adopción:', err)
    });
  }


  // Valida que no sea futura
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
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0];
      // Opcional: muestra preview de la nueva imagen
      const reader = new FileReader();
      reader.onload = () => this.currentImageUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }


  //FormDAta
  async submitAdoption(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === 'image') return;
      formData.append(key, String(val));
    });

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    try {
      // Cambia los datos
      await this.adoptionService.updateAdoption(this.adoptionId, formData);

      //actualiza la lista de adopciones
      await this.adoptionService.getAdoptions(0, 10);

      // Cierra el modal
      this.closeModal();

    } catch (err) {
      console.error(err);
      alert('Error al editar la adopción');
    }
  }


  closeModal(): void {
    this.closed.emit();
  }

}
