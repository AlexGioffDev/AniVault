import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimeDataInfo } from '../../models/Anime';
import { AnimeCharactersInfo } from '../../models/AnimeCharacters';
import { AnimeReviewsData } from '../../models/AnimeReviews';
import { AnimeRecommentationsInfo } from '../../models/AnimeRecommendations';
import { forkJoin, of, catchError } from 'rxjs';
import { LoadingComponent } from '../../components/utils/loading/loading.component';
@Component({
  selector: 'app-anime',
  imports: [RouterLink, LoadingComponent],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css',
})
export class AnimeComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  private activatedRoute = inject(ActivatedRoute);
  animeID?: number;
  animeInfo: {
    anime?: AnimeDataInfo;
    characters?: AnimeCharactersInfo[];
    reviews?: AnimeReviewsData[];
    recommendations?: AnimeRecommentationsInfo[];
  } = {};
  error?: string;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.animeID = params['id'];
      this.loadAnimeData();
    });
  }

  ngOnDestroy(): void {
    this.animeInfo = {
      anime: undefined,
      characters: undefined,
      reviews: undefined,
      recommendations: undefined,
    };
  }

  loadAnimeData(): void {
    this.animeInfo = {
      anime: undefined,
      characters: undefined,
      reviews: undefined,
      recommendations: undefined,
    };
    this.isLoading = true;
    if (this.animeID) {
      forkJoin({
        anime: this.apiService.getAnime(this.animeID).pipe(
          catchError((err) => {
            this.error = 'Error';
            return of(null);
          })
        ),
        characters: this.apiService.getAnimeCharacters(this.animeID).pipe(
          catchError((err) => {
            this.error = 'Error';
            return of(null);
          })
        ),
        reviews: this.apiService.getAnimeReviews(this.animeID).pipe(
          catchError((err) => {
            this.error = 'Error';
            return of(null);
          })
        ),
        recommendations: this.apiService
          .getAnimeRecommendations(this.animeID)
          .pipe(
            catchError((err) => {
              this.error = 'Error';
              return of(null);
            })
          ),
      }).subscribe({
        next: (response) => {
          this.animeInfo.anime = response.anime?.data || undefined;
          this.animeInfo.characters = response.characters?.data || undefined;
          this.animeInfo.reviews = response.reviews?.data || undefined;
          this.animeInfo.recommendations =
            response.recommendations?.data || undefined;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Error on find data!!!';
          this.isLoading = false;
        },
      });
    }
  }

  get sortedCharacters() {
    return this.animeInfo.characters
      ?.filter(
        (a) => a.voice_actors.length > 0 && a.voice_actors[0].person.images
      )
      .sort((a, b) => b.favorites - a.favorites)
      .slice(0, 15);
  }

  get sortedReviews() {
    if (
      this.animeInfo.reviews == undefined ||
      this.animeInfo.reviews.length < 0
    ) {
      return null;
    }

    return this.animeInfo.reviews
      .filter((a) => !a.is_spoiler && a.user.images)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
  }
}
