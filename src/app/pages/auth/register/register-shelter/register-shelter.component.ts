import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl, AbstractControlOptions, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import {City} from '../../../../core/models/enums/city.enum';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-register-shelter',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './register-shelter.component.html',
  styleUrl: './register-shelter.component.css'
})

export class RegisterShelterComponent implements OnInit {
  cities = Object.values(City);
  // private authService = inject(AuthService);

  // nameShelter: string = '';
  // username: string = '';
  // identification: string = '';
  // address: string = '';
  // city: string = '';
  // country: string = '';
  // phoneNumber: string = '';
  // email: string = '';
  // password: string = '';
  // confirmPassword = '';
  // website_url: string = '';


  // registerShelter(){
  //   // 1. validación de los campos
  //   if(!this.nameShelter || !this.username || !this.identification || !this.address  || !this.phoneNumber || !this.email || !this.password || !this.confirmPassword){
  //     alert("Has dejado los campos vacios")
  //     return;
  //   }

  //   // 2. Validación de contraseña
  //   if (this.password !== this.confirmPassword) {
  //     alert("Las contraseñas no coinciden");
  //     return;
  //   }

  //   const payload = {
  //     nameShelter: this.nameShelter,
  //     identification: this.identification,
  //     username: this.username,
  //     address: this.address,
  //     city: this.city,
  //     country: this.country,
  //     phoneNumber: this.phoneNumber,
  //     email : this.email,
  //     password : this.password,
  //     website_url : this.website_url
  //   }
  //   // console.log(payload)

  //   this.authService.registerShelter(payload).subscribe();
  // }


  form!: FormGroup;
  sending = false;

  constructor( private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    const controlOptions: AbstractControlOptions = {
      validators: this.matchPasswords
    };

    this.form = this.formBuilder.group({
      nameShelter:    ['', Validators.required],
      identification: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      username:       ['', [Validators.required, Validators.minLength(4)]],
      address:        ['', Validators.required],
      city:           ['', Validators.required],
      country:        ['', Validators.required],
      phoneNumber:    ['', [Validators.required, Validators.pattern(/^[\d+\-\s]{7,15}$/)]],
      website_url:    [''],
      email:          ['', [Validators.required, Validators.email]],
      password:       ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword:['', Validators.required]
    }, controlOptions);
  }

  // Verifica si las contraseñas coinciden
  private matchPasswords(control: AbstractControl) {
    const pass = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return pass === confirm ? null : { notSame: true };
  }

  registerShelter(): void {
    this.sending = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sending = false;
      return;
    }

    const data = {...this.form.value};
    delete (data as any).confirmPassword;

    this.auth.registerShelter(data).subscribe({
      next: () => this.router.navigate(['/loginshelter']),
      error: () => {
        alert('Error al registrar el refugio');
        this.sending = false;
      }
    });
  }


}
