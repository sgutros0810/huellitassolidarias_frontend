import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { PostModel } from '../models/post.model';

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
    const obs$ = this.http.get<PostModel[]>(`${this.apiUrl}/my-posts?page=${page}&size=${size}`,
      {
        headers: this.getAuthHeaders()
      }
    )

    obs$.subscribe(posts => {
      this.PostModel = posts;
      this.listPostBS.next(posts);
    })

    return obs$;
  }

  // Crear un nuevo post
  async createPost(formData: FormData) {
    return  await firstValueFrom( this.http.post(this.apiUrl, formData, {
      headers: this.getAuthHeaders(), responseType: 'text'
    }));
  }


  async getPosts(page: number, size: number): Promise<void> {
    if (page < 0) page = 0;
    if (size < 1) size = 10;

    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    const response = await firstValueFrom(
      this.http.get<any>(this.apiUrl, { params })
    );

    this.PostModel = response.content;
    this.listPostBS.next(this.PostModel);
  }


  setPostList(posts: PostModel[]){
    this.PostModel = posts;
    this.listPostBS.next(posts);
  }


  //Eliminar mi post
  deleteMyPost(postId: number){
    return this.http.delete(`${this.apiUrl}/${postId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as const
    });
  }

  deletePostLocal(postId: number): void{
    // console.log(this.PostModel)
    this.PostModel = this.PostModel.filter(post => post.id !== postId)
    this.listPostBS.next(this.PostModel);
    // console.log(this.PostModel)
  }

  async updatePost(postId: number, formData: FormData) : Promise<void> {
    await firstValueFrom(
      this.http.put(`${this.apiUrl}/${postId}`, formData, {
        headers: this.getAuthHeaders(),
        responseType: 'text' as const
      })
    );
  }
}
