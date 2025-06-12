import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  token = signal<string | null> (localStorage.getItem('authToken'));

  loginUser(email:string, password:string){
    return this.http.post<{token:string}>(`${environment.apiUrl}/auth/loginuser`, {email, password})
    .pipe(tap(response => this.handleAuthSuccess(response.token)));
  }

  loginShelter(identification:string, password:string){
        return this.http.post<{token:string}>(`${environment.apiUrl}/auth/loginshelter`, {identification, password})
        .pipe(tap(response => this.handleAuthSuccess(response.token)));
  }

  // sendPasswordReset(email: string) {
  //   return this.http.post(`${environment.apiUrl}/auth/forgot-password`, { email });
  // }

  logout(){
    localStorage.removeItem('authToken');
    this.token.set(null);
    this.router.navigate(['/loginuser'])
  }

  registerUser(data: any){
    return this.http.post<{token:string}>(`${environment.apiUrl}/auth/registeruser`, data)
    .pipe(tap(response => this.handleAuthSuccess(response.token)));
  }

  registerShelter(data: any){
    return this.http.post<{token:string}>(`${environment.apiUrl}/auth/registershelter`, data)
    .pipe(tap(response => this.handleAuthSuccess(response.token)));
  }

  handleAuthSuccess(token:string) {
    localStorage.setItem('authToken', token);
    this.token.set(token);
    this.router.navigate(['/adoptions']);
  }

  isUserLogged() {
    return !!this.token()
  }
}
