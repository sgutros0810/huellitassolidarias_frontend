import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, firstValueFrom, Observable, throwError } from 'rxjs';
import { UserProfileModel } from '../modals/user.model';
import { ShelterModel } from '../modals/shelter.model';
import { ShelterDetailModel } from '../modals/shelter-detail.model';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;


  ShelterModel: Array<ShelterModel> = [];
  listSheltersBS: BehaviorSubject<Array<ShelterModel>> = new BehaviorSubject<Array<ShelterModel>>([]);
  listSheltersObs$ = this.listSheltersBS.asObservable();


  constructor(private zone: NgZone) {}

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

  // Obtiene todos los usaurios con ROL = REFUGIO
  async getShelters(page: number, size: number): Promise<void> {
    if (page < 0) page = 0;
    if (size < 1) size = 10;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    this.ShelterModel = (await firstValueFrom(
      this.http.get<{ content: ShelterModel[] }>(`${environment.apiUrl}/shelters`, { params })
    )).content;

    this.listSheltersBS.next(this.ShelterModel);
  }

  // Obtiene todos los usaurios con ROL = REFUGIO
  // async getSheltersById(shelterId:number) {
  //   this.ShelterModel = (await firstValueFrom(
  //     this.http.get<{ content: ShelterModel[] }>(this.apiUrl + `/shelters/details/${shelterId}`)
  //   )).content;

  //   this.zone.run(() => {this.listSheltersBS.next(this.ShelterModel);  });
  // }

  getShelterById(shelterId: number): Observable<ShelterDetailModel> {
    return this.http.get<ShelterDetailModel>(`${environment.apiUrl}/shelters/details/${shelterId}`);
  }

}
