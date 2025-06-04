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


  // Obtener posts de usuario
  getMyPosts(page: number = 0, size: number = 10): Observable<PostModel[]>{
    return this.http.get<PostModel[]>(`${this.apiUrl}/my-posts?page=${page}&size=${size}`,
      { headers: this.getAuthHeaders() }
    )
  }

  // Crear un nuevo post
  async createPost(formData: FormData) {
    return  await firstValueFrom( this.http.post(this.apiUrl, formData, {
      headers: this.getAuthHeaders(), responseType: 'text'
    }));
  }


  async getPosts(page: number, size: number): Promise<void>{
    if (page < 0) page = 0;
    if (size < 1) size = 10;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

      this.PostModel = await firstValueFrom(
        this.http.get<PostModel[]>(this.apiUrl, {params})
      );

      this.listPostBS.next(this.PostModel);
  }


  //Eliminar mi post
  deleteMyPost(postId: number){
    return this.http.delete(`${this.apiUrl}/${postId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as const
    });
  }

  deletePostLocal(postId: number): void{
    console.log(this.PostModel)
    this.PostModel = this.PostModel.filter(post => post.id !== postId)
    this.listPostBS.next(this.PostModel);
    console.log(this.PostModel)

  }

  // Obtener comentarios de un post
  getComments(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${postId}/comments`);
  }

  // Agregar un comentario a un post
  addComment(postId: number, text: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/comments`, { text }, {
      headers: this.getAuthHeaders()
    });
  }
}
