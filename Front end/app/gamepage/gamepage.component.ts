import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Game } from '../landing/game.model';
import { Review, createReview } from './review.model';
import { ReviewService } from './review.service';


@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  reviewMessage: string;
  reviewRating: number;
  reviewGameID: number;
  username: string;
  reviewObject: Review;
  reviewList: Review[];
  avgRating: number;
  count: number;
  total: number;

  constructor(private reviewService: ReviewService,
    public dialogRef: MatDialogRef<GamepageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game) {
      this.reviewGameID = data.gameID;
      this.reviewList = data.review;
      this.calculateAvg();
    }

  hasYoutubeUrl(youtubeLink: string): boolean {
    if (youtubeLink) {
      return true;
    }
    return false;
  }


  // getYoutubeUrl(youtubeLink: string) {
  //   console.log('inside get url ' + youtubeLink);
  //   return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + youtubeLink + '?ecver=2');
  // }

  calculateAvg(): void {
    this.count = 0;
    this.total = 0;
    // tslint:disable-next-line:prefer-const
    for (let rate of this.reviewList) {
      this.count++;
      this.total += rate.rating;
    }
    this.avgRating = this.total / this.count;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.reviewRating = 5;
    // get reviews to load
  }

  hasRating(): boolean {
    if (this.count !== 0) {
      return true;
    }
    return false;
  }

  canSubmit(): boolean {
    const user = localStorage.getItem('userData');
    if (!user || user === '') {
      return true;
    }
      return false;
  }

  submitReview(): void {
    this.username = localStorage.getItem('userData');
    this.reviewObject = createReview(this.username, this.reviewGameID, this.reviewMessage, this.reviewRating);
    this.reviewService.submitUserReview(this.reviewObject)
    .subscribe(
      response => {
        console.log('success');
        // get reviews again and maybe scroll down?
        this.getReviews();
      },
      error => {
        console.log('error');
      }
    );
    this.reviewMessage = '';
    this.reviewRating = 5;
  }

  getReviews(): void {
    this.reviewService.getUserReviews(this.reviewGameID)
    .subscribe(
      response => {
        this.reviewList = response;
        this.calculateAvg();
      },
      error => {
        console.log('error');
      }
    );
  }

  arrayOne(n: number): number[] {
    return Array(n);
  }
}
