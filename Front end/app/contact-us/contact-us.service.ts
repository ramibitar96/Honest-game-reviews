import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../home/user.model';
import { Observable } from 'rxjs';
import { Message } from './message.model';
import { timeout } from 'q';


@Injectable()
export class ContactUsService implements OnInit {

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }

  public sendMessage(username: string, email: string, message: string) {
    const concern = {'username': username, 'email': email, 'message': message};
    return this.http.post<Message>('http://localhost:8080/contact', concern);
  }

}
