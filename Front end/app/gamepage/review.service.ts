import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Review } from '../gamepage/review.model';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewService {
  constructor(private http: HttpClient) {

  }

  public submitUserReview(review: Review): Observable<any> {
    return this.http.post('http://localhost:8080/postReview', review);
  }

  public getUserReviews(gameID: number): Observable<any> {
    let params: HttpParams =  new HttpParams();
    params = params.set('gameID', gameID.toString());
    console.log(params);
    return this.http.get('http://localhost:8080/getReview', {params});
  }
}
