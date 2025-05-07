import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
  }

  email: string = '';
  password: string = '';

  ngOnInit() {
    // alert(`Las credenciales son: 'prueba@ejemplo.com' y password: prueba`)
  }

  login() {
    const hardcodedEmail = 'sofia54310@gmail.com';
    const hardcodedPassword = 'sofia54310';

    console.log('Email ingresado:', this.email);
    console.log('Password ingresado:', this.password);

    if (this.email == hardcodedEmail && this.password == hardcodedPassword) {
      console.log('Login exitoso');
      return this.authService.login();
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }
}
