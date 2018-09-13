import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { GamepageComponent } from './gamepage/gamepage.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { SignUpService } from './home/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderService } from './header/header.service';
import { ContactUsService } from './contact-us/contact-us.service';
import { ApiService } from './landing/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReviewService } from './gamepage/review.service';
import { VideoPipe } from './gamepage/videopipe';
import { ForumComponent } from './forum/forum.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { ForumService } from './forum/forum.service';
import { CommentService } from './forum-post/comment.service';
import { ReversePipe } from './forum/reversepipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    HeaderComponent,
    ProfileComponent,
    LandingComponent,
    GamepageComponent,
    ContactUsComponent,
    VideoPipe,
    ForumComponent,
    ForumPostComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [SignUpService, HeaderService, ContactUsService, ApiService, ReviewService, ForumService, CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
