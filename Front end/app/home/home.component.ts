import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignUpService } from '../home/signup.service';
import { User } from './user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private signUpService: SignUpService) {}

  ngOnInit() {
    this.user = new User();
  }

  public signup(): void {
    if (this.user.email == null) {
      document.getElementById('information').innerHTML =
        'Please enter a valid email.';
    } else if (this.user.username == null) {
      document.getElementById('information').innerHTML =
        'Username can not be empty.';
    } else if (
      this.user.password !== this.user.cPassword ||
      this.user.password == null ||
      this.user.cPassword == null
    ) {
      document.getElementById('information').innerHTML =
        'Passwords do not match or password is empty, try again.';
    } else {
      this.signUpService.submitUserInfo(this.user).subscribe(
        data => {
          // tslint:disable-next-line:max-line-length
          document.getElementById('information').innerHTML =
            'Account created successfully! Make sure to check your email for account activation.';
        },
        error => {
          this.handleError(error);
        }, () => {

        }
      );
    }


    this.user.username = null;
    this.user.email = null;
    this.user.password = null;
    this.user.cPassword = null;
  }

  public handleError(error) {
    if (error.status === 406) {
      // tslint:disable-next-line:max-line-length
      document.getElementById('information').innerHTML =
      'That username is already in use. Please pick another and try again';
    } else if (error.status === 400) {
      // tslint:disable-next-line:max-line-length
      document.getElementById('information').innerHTML =
        'That email is either invalid or already in use. Look at your spelling and try again';
    }
  }
}
