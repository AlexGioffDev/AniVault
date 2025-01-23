import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimeSearch } from '../models/AnimeSearch';
import { AnimeData } from '../models/Anime';
import { AnimeCharacters } from '../models/AnimeCharacters';
import { AnimeReviews } from '../models/AnimeReviews';
import { AnimeRecommendations } from '../models/AnimeRecommendations';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getTopAnime(page: number, type?: string): Observable<AnimeSearch> {
    const animeType = type || 'tv';

    return this.http.get<AnimeSearch>(
      `https://api.jikan.moe/v4/top/anime?type=${animeType}&order_by=score&page=${page}`
    );
  }

  getAnime(id: number): Observable<AnimeData> {
    return this.http.get<AnimeData>(
      `https://api.jikan.moe/v4/anime/${id}/full`
    );
  }

  getAnimeCharacters(id: number): Observable<AnimeCharacters> {
    return this.http.get<AnimeCharacters>(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    );
  }

  getAnimeReviews(id: number): Observable<AnimeReviews> {
    return this.http.get<AnimeReviews>(
      `https://api.jikan.moe/v4/anime/${id}/reviews`
    );
  }

  getAnimeRecommendations(id: number): Observable<AnimeRecommendations> {
    return this.http.get<AnimeRecommendations>(
      `https://api.jikan.moe/v4/anime/${id}/recommendations`
    );
  }
}
