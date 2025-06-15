import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CityService {
  private readonly apiUrl = `${environment.apiUrl.replace(/\/api\/v1$/, '')}/api/v1/cities`;

  constructor(private http: HttpClient) {}

  getCities() {
    return this.http.get<string[]>(this.apiUrl);
  }
}
