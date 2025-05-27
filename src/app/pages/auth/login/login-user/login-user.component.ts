import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';


@Component({
  selector: 'app-login-user',
  imports: [ FormsModule ],
  templateUrl: './login-user.component.html',
})

export class LoginUserComponent {

  private authService = inject(AuthService);

  email: string = '';
  password: string = '';


  loginUser() {

    if(!this.email || !this.password){
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.authService.loginUser(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        // Redirigir o guardar token, etc.

      },
      error: (error) => {
        console.error('Error en login:', error);
        alert('Credenciales inválidas o error de servidor.');
      }
    });
  }


  login() {
    console.log(this.email);
    console.log(this.password);
  }


}
