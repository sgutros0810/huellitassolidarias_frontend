import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { AdoptionModel } from '../modals/adoption.model';
import { AdoptionDetailModel } from '../modals/adoption-detail.model';

@Injectable({
  providedIn: 'root'
})
export class AdoptionService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/adoptions';

  AdoptionModel: Array<AdoptionModel> = [];
  listAdoptionBS: BehaviorSubject<Array<AdoptionModel>> = new BehaviorSubject<Array<AdoptionModel>>([]);
  listAdoptionObs$ = this.listAdoptionBS.asObservable();

  constructor() { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  //Crear adopcion
  async createAdoption(formData: FormData) {
   return  await firstValueFrom( this.http.post(this.apiUrl, formData, {
      headers: this.getAuthHeaders(), responseType: 'text'
    }));
  }


  async getAdoptions(page: number = 0, size: number = 10): Promise<void> {
    const params = new HttpParams().set('page', page).set('size', size);
    this.AdoptionModel = await firstValueFrom(
      this.http.get<AdoptionModel[]>(this.apiUrl, { params })
    );
    this.listAdoptionBS.next(this.AdoptionModel);
  }

  getAdoptionById(adoptionId: number): Observable<AdoptionDetailModel> {
    return this.http.get<AdoptionDetailModel>(`${environment.apiUrl}/adoptions/details/${adoptionId}`);
  }


}
