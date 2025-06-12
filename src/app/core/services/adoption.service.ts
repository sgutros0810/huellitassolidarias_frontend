import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AdoptionModel } from '../modals/adoption.model';
import { AdoptionDetailModel } from '../modals/adoption-detail.model';
import { PageResponse } from '../modals/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  AdoptionModel: Array<AdoptionModel> = [];
  listAdoptionBS: BehaviorSubject<Array<AdoptionModel>> = new BehaviorSubject<Array<AdoptionModel>>([]);
  listAdoptionObs$ = this.listAdoptionBS.asObservable();


  listAdoptionShelterBS: BehaviorSubject<Array<AdoptionModel>> = new BehaviorSubject<Array<AdoptionModel>>([]);
  listAdoptionShelterObs$ = this.listAdoptionShelterBS.asObservable();


  constructor() { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  //Crear adopcion
  async createAdoption(formData: FormData) {
   return  await firstValueFrom( this.http.post(`${environment.apiUrl}/adoptions`, formData, {
      headers: this.getAuthHeaders(), responseType: 'text'
    }));
  }


  async getAdoptions(page: number = 0, size: number = 10): Promise<void> {
    const params = new HttpParams().set('page', page).set('size', size);
    this.AdoptionModel = await firstValueFrom(
      this.http.get<AdoptionModel[]>(`${environment.apiUrl}/adoptions?page=${page}&size=${size}`, { params })
    );
    this.listAdoptionBS.next(this.AdoptionModel);
  }

  //Adopciones de un animal
  getAdoptionById(adoptionId: number): Observable<AdoptionDetailModel> {
    return this.http.get<AdoptionDetailModel>(`${environment.apiUrl}/adoptions/details/${adoptionId}`);
  }

  //Adopciones de un refugio /shelters/details/2/adoptions
  async getAdoptionByShelterId(shelterId: number, page: number = 0, size: number = 10): Promise<void> {
    const response = await firstValueFrom(
      this.http.get<PageResponse<AdoptionModel>>(
        `${this.apiUrl}/shelters/details/${shelterId}/adoptions?page=${page}&size=${size}`
      )
    );
    this.listAdoptionBS.next(response.content);
  }


  async loadAdoptionByShelterId(shelterId: number, page: number = 0, size: number = 10): Promise<void> {
    const response = await firstValueFrom(
      this.http.get<PageResponse<AdoptionModel>>(
        `${this.apiUrl}/shelters/details/${shelterId}/adoptions?page=${page}&size=${size}`
      )
    );
    this.listAdoptionShelterBS.next(response.content);
  }

  deleteAdoption(adoptionId: number) {
    return this.http.delete(`${this.apiUrl}/adoptions/${adoptionId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as const
    });
  }

  async updateAdoption(adoptionId: number, formData: FormData) : Promise<void> {
    await firstValueFrom(
      this.http.put(`${this.apiUrl}/adoptions/${adoptionId}`, formData, {
        headers: this.getAuthHeaders(),
        responseType: 'text' as const
      })
    );
  }

}
