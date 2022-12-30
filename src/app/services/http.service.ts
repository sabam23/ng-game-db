import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}
