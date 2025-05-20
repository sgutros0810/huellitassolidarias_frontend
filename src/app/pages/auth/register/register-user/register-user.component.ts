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
  address: string = '';
  city: string = '';
  country: string = '';

  registerUser(){

    if(!this.name || !this.username || !this.phoneNumber || !this.email || !this.password){
      alert("Has dejado los campos vacios")
      return;
    }

    const payload = {
      name: this.name,
      lastname: this.lastname,
      phoneNumber: this.phoneNumber,
      username: this.username,
      address: this.address,
      city: this.city,
      country: this.country,
      email : this.email,
      password : this.password
    }

    this.authService.registerUser(payload).subscribe();
  }
}
