import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = signal<boolean>(false);
  constructor(private router: Router) { }

  login(){
    this.isAuthenticated.set(true);
    this.router.navigate(['']);
  }

  logout(){
    this.isAuthenticated.set(false);
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean{
    return this.isAuthenticated();
  }



}
