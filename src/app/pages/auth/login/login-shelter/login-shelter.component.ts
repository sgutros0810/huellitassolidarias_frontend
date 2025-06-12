import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-shelter',
  imports: [ ReactiveFormsModule, RouterLink ],
  templateUrl: './login-shelter.component.html'
})
export class LoginShelterComponent implements OnInit {

  // private authService = inject(AuthService);
  // identification: string = '';
  // password: string = '';

  form!: FormGroup;
  loading = false;

  constructor( private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      identification: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  loginShelter(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    const { identification, password } = this.form.value;

    this.auth.loginShelter(identification, password).subscribe({
      next: () => {
        this.router.navigate(['/adoptions']);
      },
      error: () => {
        alert('Credenciales incorrectas o error en el servidor.');
        this.loading = false;
      }
    });
  }

}
