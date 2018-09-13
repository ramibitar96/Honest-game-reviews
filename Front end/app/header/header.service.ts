import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../home/user.model';
import { Observable } from 'rxjs';


@Injectable()
export class HeaderService implements OnInit {

  loggedInUser: string;
  isLoggedIn: boolean;
  loggedInUserEmail: string;

  constructor(private http: HttpClient) {
    console.log('this is the header service constructor');
  }

  ngOnInit() {
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
  }

  public loginUser(email: string, password: string) {
    const user = { 'email': email, 'password': password };
    // {} for get only
    this.http.post<User>('http://localhost:8080/login', user)
      .subscribe(data => {
        this.isLoggedIn = true;
        this.loggedInUser = data.username;
        this.loggedInUserEmail = data.email;
        localStorage.setItem('userData', this.loggedInUser);
        localStorage.setItem('isLoggedIn', 'true');
      },
        error => {
          alert('invalid username or password');
        });
  }

  public logoutUser() {
    this.loggedInUser = null;
    this.isLoggedIn = false;
    localStorage.removeItem('userData');
    localStorage.setItem('isLoggedIn', 'false');
  }
}
