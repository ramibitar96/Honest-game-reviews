import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Post } from './post.model';
import { Observable } from 'rxjs';

@Injectable()
export class ForumService {
  constructor(private http: HttpClient) {

  }

  public submitForumPost(post: Post): Observable<any> {
    return this.http.post('http://localhost:8080/newPost', post);
  }

  public getForumPosts(): Observable<any> {
    return this.http.get('http://localhost:8080/getPosts');
  }

}
