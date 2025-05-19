import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth.service';
import { FormsModule } from '@angular/forms';

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
  phoneNumber: string = '';
  email: string = '';
  password: string = '';

  registerShelter(){

    if(!this.nameShelter || !this.username || !this.identification || !this.address  || !this.phoneNumber || !this.email || !this.password){
      alert("Has dejado los campos vacios")
      return;
    }

    this.authService.registerShelter(this.nameShelter, this.identification, this.username, this.address, this.phoneNumber, this.email, this.password).subscribe();
  }
}
