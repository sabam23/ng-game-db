import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'https://api.rawg.io/api'

  getGameList(
    ordering: string,
    search?: string
  ) :Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);
    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${this.BASE_URL}/games?key=a92e01e8cde044f3b9ae34a4aa0c9866`, {
      params: params
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${this.BASE_URL}/games/${id}?key=a92e01e8cde044f3b9ae34a4aa0c9866`);
    const gameTrailersRequest = this.http.get(
      `${this.BASE_URL}/games/${id}/movies?key=a92e01e8cde044f3b9ae34a4aa0c9866`
    );
    const gameScreenshotsRequest = this.http.get(
      `${this.BASE_URL}/games/${id}/screenshots?key=a92e01e8cde044f3b9ae34a4aa0c9866`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
