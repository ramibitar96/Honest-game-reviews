import { Component, OnInit } from '@angular/core';
import { HeaderService } from './header.service';
import { User } from '../home/user.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  email: string;
  password: string;
  theUser: string;
  loggedIn: string;

  constructor(private headerService: HeaderService) { }

  ngOnInit() {
    if (localStorage.getItem('userData') != null) {
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      localStorage.setItem('isLoggedIn', 'false');
    }
    this.loggedIn = localStorage.getItem('isLoggedIn');
  }


  public login(): void {
    this.headerService.loginUser(this.email, this.password);
    this.email = null;
    this.password = null;
    this.theUser = JSON.parse(localStorage.getItem('userData'));
  }

  public logout() {
    this.headerService.logoutUser();
    console.log(this.loggedIn);
    this.loggedIn = localStorage.getItem('isLoggedIn');
    console.log(this.loggedIn);
  }

  public getLog() {
    return localStorage.getItem('isLoggedIn');
  }

  public getUsername() {
    return localStorage.getItem('userData');
  }
}
