import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PageResponse } from '../models/page-response.model';
import {UserAdminResponse} from '../models/user-admin-response';
import {AdoptionModel} from '../models/adoption.model';
import {AdoptionDetailModel} from '../models/adoption-detail.model';
import {AnimalReportModel} from '../models/animal-report.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken') || '';
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  listUsers(page: number, size: number, role?: string, verified?: boolean, active?: boolean, search?: string): Observable<PageResponse<UserAdminResponse>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (role) params = params.set('role', role);
    if (verified !== undefined) params = params.set('verified', verified.toString());
    if (active !== undefined) params = params.set('active', active.toString());
    if (search) params = params.set('search', search);

    return this.http.get<PageResponse<UserAdminResponse>>(
      `${this.apiUrl}/admin/users`,
      { params, headers: this.getAuthHeaders() }
    );
  }

  getAllPosts(page: number, size: number) {
    const token = localStorage.getItem('authToken');
    return this.http.get<any>(`${this.apiUrl}/admin/posts?page=${page}&size=${size}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAllAdoptions(page: number, size: number, search: string): Observable<PageResponse<AdoptionDetailModel>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search);

    return this.http.get<PageResponse<AdoptionDetailModel>>(
      `${this.apiUrl}/admin/adoptions`,
      { params, headers: this.getAuthHeaders() }
    );
  }

  getAllReports(page: number, size: number, search?: string): Observable<PageResponse<AnimalReportModel>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<PageResponse<AnimalReportModel>>(
      `${this.apiUrl}/admin/reports`,
      { params, headers: this.getAuthHeaders() }
    );
  }


  toggleActive(userId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/admin/users/${userId}/toggle`,
      null,
      { headers: this.getAuthHeaders() }
    );
  }

  updateRole(userId: number, role: 'ADMIN' | 'USUARIO' | 'REFUGIO'): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/admin/users/${userId}/role`,
      { role },
      { headers: this.getAuthHeaders() }
    );
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/admin/users/${userId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/admin/posts/${postId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/admin/comments/${commentId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteReport(reportId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/admin/reports/${reportId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  deleteAdoption(adoptionId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/admin/adoptions/${adoptionId}`,
      { headers: this.getAuthHeaders() }
    );
  }

  verifyShelter(userId: number): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/admin/users/${userId}/verify-shelter`,
      null,
      { headers: this.getAuthHeaders() }
    );
  }
}
