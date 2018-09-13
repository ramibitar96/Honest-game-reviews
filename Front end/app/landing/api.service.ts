import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GameInfo } from './gameinfo.model';

@Injectable()
export class ApiService {
  smallPhotoUrl = 'https://cdn.thegamesdb.net/images/small/';
  thumbPhotoUrl = 'https://cdn.thegamesdb.net/images/thumb/';

  constructor(private http: HttpClient) {
  // localStorage.removeItem('savedInfo');
  }

  public fetchGameInfo(page: string, gameName: string, platformID: string, gameId: string): Observable<GameInfo> {

    let params: HttpParams =  new HttpParams();
    params = params.set('page', page)
    .set('name', gameName)
    .set('platformID', platformID)
    .set('id', gameId);
    return this.http.get<GameInfo>('http://localhost:8080/fetchGameList', {params});
  }
}
