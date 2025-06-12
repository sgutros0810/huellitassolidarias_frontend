import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register-user',
  imports: [ FormsModule, ReactiveFormsModule ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements OnInit {


  form!: FormGroup;
  isSubmitting = false;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }

   ngOnInit(): void {
    const controlOptions: AbstractControlOptions = {
      validators: this.matchPasswords
    };

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      lastname: [''],
      username: ['', [Validators.required, Validators.minLength(4)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[\d+\-\s]{7,15}$/)]],
      address: [''],
      city: [''],
      country: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, controlOptions);
  }

  // Verifica si las contraseñas coinciden
  private matchPasswords(control: AbstractControl) {
    const pass = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return pass === confirm ? null : { notSame: true };
  }


  registerUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const userData = { ...this.form.value };
    delete userData.confirmPassword;

    this.authService.registerUser(userData).subscribe({
      next: () => this.router.navigate(['/loginuser']),
      error: () => {
        alert('Hubo un error al registrar el usuario.');
        this.isSubmitting = false;
      }
    });
  }

  // registerUser(){
  //   // 1. validación de los campos
  //   if(!this.name || !this.username || !this.phoneNumber || !this.email || !this.password || !this.confirmPassword){
  //     alert("Has dejado los campos vacios")
  //     return;
  //   }

  //   // 2. Validación de contraseña
  //   if (this.password !== this.confirmPassword) {
  //     alert("Las contraseñas no coinciden");
  //     return;
  //   }


  //   const payload = {
  //     name: this.name,
  //     lastname: this.lastname,
  //     phoneNumber: this.phoneNumber,
  //     username: this.username,
  //     address: this.address,
  //     city: this.city,
  //     country: this.country,
  //     email : this.email,
  //     password : this.password
  //   }

  //   this.authService.registerUser(payload).subscribe();
  // }
}
