import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ FormsModule ],
  templateUrl: './login.component.html',
})

export class LoginComponent {

  private authService = inject(AuthService);

  email: string = '';
  password: string = '';


  loginUser() {
    console.log('email - '+ this.email)
    console.log('password - '+ this.password)
    if(!this.email || !this.password){
      alert('ERES BOBO!');
      return;
    }

    this.authService.loginUser(this.email, this.password).subscribe();
  }



}
