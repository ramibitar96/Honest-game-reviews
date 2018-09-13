import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Comment } from './comment.model';
import { Observable } from 'rxjs';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {

  }

  public submitForumComment(comment: Comment): Observable<any> {
    return this.http.post('http://localhost:8080/newComment', comment);
  }

  public getForumComments(postID: number): Observable<any> {
    console.log('yo ' + postID);
    let params: HttpParams =  new HttpParams();
    params = params.set('postID', postID.toString());
    console.log('HI ' + postID.toString());
    return this.http.get('http://localhost:8080/getComments', {params});
  }

}
