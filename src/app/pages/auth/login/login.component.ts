import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { authGuard } from '../../../core/auth.guard';


@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit {

  private authService = inject(AuthService);

  email: string = '';
  password: string = '';

  ngOnInit() {
    alert(`Las credenciales son: 'prueba@ejemplo.com' y password: prueba`)
  }

  loginUser() {
    if(!this.email || !this.password){
      alert('ERES BOBO!');
      return;
    }

    this.authService.loginUser(this.email, this.password).subscribe();
  }



}
