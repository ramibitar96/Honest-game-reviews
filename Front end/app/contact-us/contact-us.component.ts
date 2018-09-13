import { Component, OnInit } from '@angular/core';
import { User } from '../home/user.model';
import { ContactUsService } from './contact-us.service';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(private contactUsService: ContactUsService) { }
  user: User;
  username: string;
  email: string;
  message: string;

  ngOnInit() {
  }

  public sendMessage() {
    this.contactUsService.sendMessage(this.username, this.email, this.message).subscribe(
      data => {
        document.getElementById('legend').innerHTML = 'Message Sent!';
      },
      error => {

      }
    );
    this.message = null;
    this.email = null;
    this.username = null;
  }

}
