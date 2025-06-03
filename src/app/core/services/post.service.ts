import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { PostModel } from '../modals/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/posts';

  PostModel: Array<PostModel> = [];
  listPostBS: BehaviorSubject<Array<PostModel>> = new BehaviorSubject<Array<PostModel>>([]);
  listPostObs$ = this.listPostBS.asObservable();


  constructor(){

  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  // Obtener un post por ID
  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  }

  // Crear un nuevo post
  async createPost(formData: FormData) {
    return  await firstValueFrom( this.http.post(this.apiUrl, formData, {
      headers: this.getAuthHeaders(), responseType: 'text'
    }));
  }

  // obtener posts
  async getPosts(page:number, size:number) {
    // return this.http.get<any[]>(this.apiUrl, {
    //   headers: this.getAuthHeaders()
    // });

    const params = new HttpParams().set("page", String(page)).set("size", String(size))

    this.PostModel = await firstValueFrom( this.http.get<PostModel[]>(this.apiUrl, {
      params
    }));

    this.listPostBS.next(this.PostModel);
  }

  // Obtener comentarios de un post
  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts/${postId}/comments`);
  }

  // Agregar un comentario a un post
  addComment(postId: string, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/posts/${postId}/comments`, { text }, {
      headers: this.getAuthHeaders()
    });
  }
}
