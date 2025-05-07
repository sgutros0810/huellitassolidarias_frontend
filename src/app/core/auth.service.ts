import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  token = signal<string | null> (localStorage.getItem('authToken'));

  loginUser(email:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/auth/login`, {email, password})
    .pipe(tap(response => this.handleAuthSuccess(response.token)));
  }

  loginShelter(identification:string, password:string){

  }

  handleAuthSuccess(token:string) {
    localStorage.setItem('authToken', token);
    this.token.set(token);
    this.router.navigate(['/adopciones']);
  }

}
