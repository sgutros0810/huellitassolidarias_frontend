import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { UserProfileModel } from '../modals/user.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  constructor() {}

  //
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  // Recicibir datos del usaurio
  getProfile(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(`${this.apiUrl}/myprofile`, {
      headers: this.getAuthHeaders()
    }).pipe(
      // Error al obtener el perfil del usuario
      catchError(err => {
        console.error('Error obteniendo perfil:', err);
        return throwError(() => new Error('Error al obtener el perfil, inténtalo más tarde.'));
      })
    );
  }

  // Editar perfil del usuario por ID de usaurio
  updateUserProfile(profile: Partial<UserProfileModel>): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(`${this.apiUrl}/userprofile`, profile, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        // Error al editar el perfil
        console.error('Error al actualizar el perfil:', err);
        return throwError(() => new Error('No se ha podido actualizar el perfil. Inténtalo de nuevo.'));
      })
    );
  }


  // Editar perfil del usuario por ID de usaurio
  updateShelterProfile(profile: Partial<UserProfileModel>): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(`${this.apiUrl}/shelterprofile`, profile, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(err => {
        // Error al editar el perfil
        console.error('Error al actualizar el perfil:', err);
        return throwError(() => new Error('No se ha podido actualizar el perfil. Inténtalo de nuevo.'));
      })
    );
  }


  updateProfileImage(formData: FormData): Observable<void> {
    return this.http.put<void>(`${environment.apiUrl}/profile-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')!}`
      }
    });
  }
}
