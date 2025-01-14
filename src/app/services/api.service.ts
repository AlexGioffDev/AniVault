import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimeSearch } from '../models/Anime';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getTopAnime(page: number): Observable<AnimeSearch> {
    return this.http.get<AnimeSearch>(`https://api.jikan.moe/v4/top/anime?type=tv&order_by=score&page=${page}`)
  }
}
