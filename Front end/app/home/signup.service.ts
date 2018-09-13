import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';

@Injectable()
export class SignUpService {
  constructor(private http: HttpClient) {

  }

  public submitUserInfo(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/createUser', user);
  }
}
