import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-shelter',
  imports: [ FormsModule],
  templateUrl: './login-shelter.component.html'
})
export class LoginShelterComponent {

  private authService = inject(AuthService);

  identificacionFiscal: string = '';
  password: string = '';


  loginShelter() {

    if(!this.identificacionFiscal || !this.password){
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.authService.loginShelter(this.identificacionFiscal, this.password).subscribe({
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
    console.log(this.identificacionFiscal);
    console.log(this.password);
  }


}
