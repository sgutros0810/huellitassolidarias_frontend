import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnInit, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostModel } from '../modals/post.model';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { CommentModel } from '../modals/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + '/posts/';

  CommentModel: Array<CommentModel> = [];
  listCommentBS: BehaviorSubject<Array<CommentModel>> = new BehaviorSubject<Array<CommentModel>>([]);
  listCommentObs$ = this.listCommentBS.asObservable();


  constructor(private zone: NgZone){

  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  // Obtener comentarios de un post
  async getCommentsByPost(postId: number) {
    this.CommentModel= await firstValueFrom( this.http.get<CommentModel[]>(`${this.apiUrl}${postId}/comments`, {
      headers: this.getAuthHeaders()
    }));
    this.zone.run(() => { this.listCommentBS.next(this.CommentModel);  });

  }

  // Agregar un comentario a un post
  async addCommentToPost(postId: number, content: string) {
     await firstValueFrom(this.http.post<CommentModel>(`${this.apiUrl}${postId}/comments`, { content }, {
      headers: this.getAuthHeaders()
    }));

    this.getCommentsByPost(postId);
  }

}
