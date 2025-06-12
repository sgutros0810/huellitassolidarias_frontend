import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-login-user',
  imports: [ ReactiveFormsModule, RouterLink ],
  templateUrl: './login-user.component.html',
})

export class LoginUserComponent implements OnInit {

//   private authService = inject(AuthService);

//   email: string = '';
//   password: string = '';


//   loginUser() {

//     if(!this.email || !this.password){
//       alert('Por favor, completa todos los campos.');
//       return;
//     }

//     this.authService.loginUser(this.email, this.password).subscribe({
//       next: (response) => {
//         console.log('Login exitoso:', response);
//         // Redirigir o guardar token, etc.

//       },
//       error: (error) => {
//         console.error('Error en login:', error);
//         alert('Credenciales inválidas o error de servidor.');
//       }
//     });
//   }


//   login() {
//     console.log(this.email);
//     console.log(this.password);
//   }


  form!: FormGroup;
  loading = false;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    //Cargando
    this.loading = true;
    const { email, password } = this.form.value;

    this.authService.loginUser(email, password).subscribe({
      next: () => {
        this.router.navigate(['/adoptions']); // Ruta ajustable
      },
      error: () => {
        alert('Credenciales incorrectas o error en el servidor.');
        this.loading = false;
      }
    });
  }


}
