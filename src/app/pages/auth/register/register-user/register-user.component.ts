import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth.service';

@Component({
  selector: 'app-register-user',
  imports: [ FormsModule ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  private authService = inject(AuthService);

  name: string = '';
  lastname: string = '';
  phoneNumber: string = '';
  username: string = '';
  email: string = '';
  password: string = '';

  registerUser(){

    if(!this.name || !this.username || !this.phoneNumber || !this.email || !this.password){
      alert("Has dejado los campos vacios")
      return;
    }

    this.authService.registerUser(this.name, this.lastname, this.phoneNumber, this.username, this.email, this.password).subscribe();
  }
}
