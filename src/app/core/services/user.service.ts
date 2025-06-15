import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { UserProfileModel } from '../models/user.model';
import { ShelterModel } from '../models/shelter.model';
import { ShelterDetailModel } from '../models/shelter-detail.model';
import { PageResponse } from '../models/page-response.model';
import { AdoptionModel } from '../models/adoption.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  ShelterModel: Array<ShelterModel> = [];
  listSheltersBS: BehaviorSubject<Array<ShelterModel>> = new BehaviorSubject<Array<ShelterModel>>([]);
  listSheltersObs$ = this.listSheltersBS.asObservable();

  AdoptionModel: Array<AdoptionModel> = [];
  listProfileAdoptionBS: BehaviorSubject<Array<AdoptionModel>> = new BehaviorSubject<Array<AdoptionModel>>([]);
  listProfileAdoptionObs$ = this.listProfileAdoptionBS.asObservable();

  private profileSubject = new BehaviorSubject<UserProfileModel | null>(null);
  profile$ = this.profileSubject.asObservable();

  constructor(private zone: NgZone) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getProfile(): Observable<UserProfileModel> {
    return this.http.get<UserProfileModel>(`${this.apiUrl}/myprofile`, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(profile => this.profileSubject.next(profile)),
      catchError(err => {
        console.error('Error obteniendo perfil:', err);
        return throwError(() => new Error('Error al obtener el perfil, inténtalo más tarde.'));
      })
    );
  }

  updateUserProfile(profile: Partial<UserProfileModel>): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(`${this.apiUrl}/userprofile`, profile, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(updated => this.profileSubject.next(updated)),
      catchError(err => {
        console.error('Error al actualizar el perfil:', err);
        return throwError(() => new Error('No se ha podido actualizar el perfil. Inténtalo de nuevo.'));
      })
    );
  }

  updateShelterProfile(profile: Partial<UserProfileModel>): Observable<UserProfileModel> {
    return this.http.put<UserProfileModel>(`${this.apiUrl}/shelterprofile`, profile, {
      headers: this.getAuthHeaders()
    }).pipe(
      tap(updated => this.profileSubject.next(updated)),
      catchError(err => {
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
    }).pipe(
      tap(() => {
        this.getProfile().subscribe();
      }),
      catchError(err => {
        console.error('Error al subir imagen:', err);
        return throwError(() => new Error('No se pudo subir la imagen.'));
      })
    );
  }

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

  getShelterById(shelterId: number): Observable<ShelterDetailModel> {
    return this.http.get<ShelterDetailModel>(`${environment.apiUrl}/shelters/details/${shelterId}`);
  }

  async getAdoptionByUser(page: number = 0, size: number = 10): Promise<void> {
    const response = await firstValueFrom(
      this.http.get<PageResponse<AdoptionModel>>(
        `${this.apiUrl}/myprofile/adoptions?page=${page}&size=${size}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')!}`
          }
        }
      )
    );
    this.listProfileAdoptionBS.next(response.content);
  }

  searchShelters(filters: { nameShelter?: string; username?: string; city?: string; country?: string; }): Observable<ShelterModel[]> {
    let params = new HttpParams();
    if (filters.nameShelter) params = params.set('nameShelter', filters.nameShelter);
    if (filters.username)   params = params.set('username', filters.username);
    if (filters.city)       params = params.set('city', filters.city);
    if (filters.country)    params = params.set('country', filters.country);

    return this.http.get<ShelterModel[]>(`${this.apiUrl}/shelters/search`, {
      headers: this.getAuthHeaders(),
      params
    }).pipe(
      catchError(err => {
        console.error('Error buscando refugios:', err);
        return throwError(() => new Error('No se pudieron cargar los refugios.'));
      })
    );
  }

  requestShelterVerification() {
    return this.http.put<void>(`${this.apiUrl}/shelters/request-verification`, null, {
      headers: this.getAuthHeaders()
    });
  }


  // Por si hace falta ewmitir manualmente
  emitProfile(profile: UserProfileModel) {
    if (profile) {
      this.profileSubject.next(profile);
    }
  }

  clearProfile() {
    this.profileSubject.next(null);
  }

}
