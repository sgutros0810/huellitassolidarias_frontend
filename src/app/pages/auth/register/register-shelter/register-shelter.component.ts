import { Component, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register-shelter',
  imports: [ FormsModule ],
  templateUrl: './register-shelter.component.html',
  styleUrl: './register-shelter.component.css'
})

export class RegisterShelterComponent {

  private authService = inject(AuthService);

  nameShelter: string = '';
  username: string = '';
  identification: string = '';
  address: string = '';
  city: string = '';
  country: string = '';
  phoneNumber: string = '';
  email: string = '';
  password: string = '';
  website_url: string = '';

  registerShelter(){

    if(!this.nameShelter || !this.username || !this.identification || !this.address  || !this.phoneNumber || !this.email || !this.password){
      alert("Has dejado los campos vacios")
      return;
    }

      const payload = {
        nameShelter: this.nameShelter,
        identification: this.identification,
        username: this.username,
        address: this.address,
        city: this.city,
        country: this.country,
        phoneNumber: this.phoneNumber,
        email : this.email,
        password : this.password,
        website_url : this.website_url
      }
      console.log(payload)

    this.authService.registerShelter(payload).subscribe();
  }
}
