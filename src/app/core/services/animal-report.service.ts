import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AnimalReportModel } from '../models/animal-report.model';



export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class AnimalReportService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/animal-reports';

  animalReportsBS: BehaviorSubject<Array<AnimalReportModel>> = new BehaviorSubject<Array<AnimalReportModel>>([]);
  animalReportsObs$ = this.animalReportsBS.asObservable();

  constructor() {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  async getAllReports(page: number = 0, size: number = 10): Promise<void> {
    const params = new HttpParams().set('page', page).set('size', size);
    const response = await firstValueFrom(
      this.http.get<Page<AnimalReportModel>>(this.apiUrl, { params })
    );
    this.animalReportsBS.next(response.content);
  }

  async getMyReports(page = 0, size = 10): Promise<void> {
    const params = new HttpParams().set('page', page).set('size', size);
    const response = await firstValueFrom(
      this.http.get<Page<AnimalReportModel>>(
        `${this.apiUrl}/myprofile`,
        { params, headers: this.getAuthHeaders() }
      )
    );
    this.animalReportsBS.next(response.content);
  }

  async updateReportState(id: number, state: 'FOUND' | 'MISSING'): Promise<void> {
    const params = new HttpParams().set('state', state);
    await firstValueFrom(
      this.http.patch<void>(
        `${this.apiUrl}/${id}/state`,
        null,
        { params, headers: this.getAuthHeaders() }
      )
    );
  }

  async getReportsByState(state: string, page: number = 0, size: number = 10): Promise<void> {
    const params = new HttpParams().set('page', page).set('size', size);
    const response = await firstValueFrom(
      this.http.get<Page<AnimalReportModel>>(`${this.apiUrl}/state/${state}`, { params })
    );
    this.animalReportsBS.next(response.content);
  }

  async createReport(report: FormData): Promise<AnimalReportModel> {
    return await firstValueFrom(
      this.http.post<AnimalReportModel>(this.apiUrl, report, {
        headers: this.getAuthHeaders()
      })
    );
  }
}
