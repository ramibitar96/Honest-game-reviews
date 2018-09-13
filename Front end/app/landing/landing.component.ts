import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { GameInfo } from './gameinfo.model';
import { Platforms } from '../gamepage/platforms.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { GamepageComponent } from '../gamepage/gamepage.component';
import { ReviewService } from '../gamepage/review.service';
import { Review } from '../gamepage/review.model';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  platformID: string;
  gameName: string;
  gameInformation: GameInfo;
  previousID: string;
  previousName: string;
  avgRating: number;
  count: number;
  total: number;
  reviewData: Review[];

  constructor(private apiService: ApiService, private reviewService: ReviewService, public dialog: MatDialog) { }

  ngOnInit() {
    this.gameInformation = JSON.parse(localStorage.getItem('savedInfo'));
    this.platformID = '0';
  }


  // tslint:disable-next-line:max-line-length
  openDialog(gameID: number, nameGame: string, releaseDate: string, gameOverview: string, artUrl: string, rating: string, youtube: string): void {
    this.reviewService.getUserReviews(gameID)
    .subscribe(
      response => {
        this.reviewData = response;
        console.log('success' + response);
        const dialogRef = this.dialog.open(GamepageComponent, {
          width: '75%',
          height: '85%',
          data: {gameID: gameID, gameName: nameGame, gameInfoText: gameOverview,
            releaseDate: releaseDate, boxUrl: artUrl, esrbRating: rating, review: this.reviewData, youtube: youtube}

        });

        dialogRef.afterClosed().subscribe(result => {
           console.log('The dialog was closed');
          // this.show = result;
        });
      },
      error => {
        console.log('error');
      }
    );
  }



  public searchFor(): void {
    this.apiService.fetchGameInfo(null, this.gameName, this.platformID, null)
    .subscribe(
      response => {
        this.previousID = this.platformID;
        this.previousName = this.gameName;
        this.gameInformation = response;
        localStorage.setItem('savedInfo', JSON.stringify(this.gameInformation));
      },
      error => {
        console.log('error');
      }
    );
  }

  public disableButton(): boolean {
    if (!this.gameName || this.gameName === '') {
      return true;
    }
    return false;
  }

  public getUrl(gameId: string) {
    const side = this.gameInformation.include.boxart.data[gameId][0].side === 'front'
                ? this.gameInformation.include.boxart.data[gameId][0].filename :
                this.gameInformation.include.boxart.data[gameId][1].filename;

    return this.apiService.thumbPhotoUrl + side;
  }

  public next(): void {
    let page = this.gameInformation.pages.next;
    if (page !== null) {
      page = page.split('page=')[1];
    }
    this.apiService.fetchGameInfo(page, this.previousName, this.previousID, null)
    .subscribe(
      response => {
        this.gameInformation = response;
        localStorage.setItem('savedInfo', JSON.stringify(this.gameInformation));
        this.scrollTop();
      },
      error => {
        console.log('error');
      }
    );
  }

  public previous(): void {
    let page = this.gameInformation.pages.previous;
    if (page !== null) {
      page = page.split('page=')[1];
    }
    this.apiService.fetchGameInfo(page, this.previousName, this.previousID, null)
    .subscribe(
      response => {
        this.gameInformation = response;
        localStorage.setItem('savedInfo', JSON.stringify(this.gameInformation));
        this.scrollTop();
      },
      error => {
        console.log('error');
      }
    );
  }

  private scrollTop(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  public disablePrevious(): boolean {
    // tslint:disable-next-line:prefer-const
    if (!localStorage.getItem('savedInfo')) {
        return true;
    }
    // tslint:disable-next-line:prefer-const
    let pPage = this.gameInformation.pages.previous;
    if (pPage !== null) {
      return false;
    }
    return true;
  }

  public disableNext(): boolean {
    if (!localStorage.getItem('savedInfo')) {
      return true;
  }
    // tslint:disable-next-line:prefer-const
    let nPage = this.gameInformation.pages.next;
    if (nPage !== null) {
      return false;
    }
    return true;
  }
}
