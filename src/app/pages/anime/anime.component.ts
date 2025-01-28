import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimeDataInfo } from '../../models/Anime';
import { AnimeCharactersInfo } from '../../models/AnimeCharacters';
import { AnimeReviewsData } from '../../models/AnimeReviews';
import { AnimeRecommentationsInfo } from '../../models/AnimeRecommendations';
import { of, catchError, delay, concatMap } from 'rxjs';
import { LoadingComponent } from '../../components/utils/loading/loading.component';
import { AnimeRelationsInfo } from '../../models/AnimeRelations';
import { RatingCardComponent } from '../../components/rating-card/rating-card.component';
@Component({
  selector: 'app-anime',
  imports: [RouterLink, LoadingComponent, RatingCardComponent],
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
    relations?: AnimeRelationsInfo[];
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
      relations: undefined,
    };
  }

  loadAnimeData(): void {
    this.animeInfo = {
      anime: undefined,
      characters: undefined,
      reviews: undefined,
      recommendations: undefined,
      relations: undefined,
    };
    this.isLoading = true;
    if (this.animeID) {
      of('start')
        .pipe(
          concatMap(() =>
            this.apiService.getAnime(this.animeID!).pipe(
              catchError((err) => {
                this.error = 'Error fetching anime';
                return of(null);
              })
            )
          ),
          concatMap((animeResponse) => {
            this.animeInfo.anime = animeResponse?.data || undefined;
            return this.apiService.getAnimeCharacters(this.animeID!).pipe(
              delay(500),
              catchError((err) => {
                this.error = 'Error fetching characters';
                return of(null);
              })
            );
          }),
          concatMap((charactersResponse) => {
            this.animeInfo.characters = charactersResponse?.data || undefined;
            return this.apiService.getAnimeReviews(this.animeID!).pipe(
              delay(500),
              catchError((err) => {
                this.error = 'Error fetching reviews';
                return of(null);
              })
            );
          }),
          concatMap((reviewsResponse) => {
            this.animeInfo.reviews = reviewsResponse?.data || undefined;
            return this.apiService.getAnimeRecommendations(this.animeID!).pipe(
              delay(500),
              catchError((err) => {
                this.error = 'Error fetching recommendations';
                return of(null);
              })
            );
          }),
          concatMap((recommendationsResponse) => {
            this.animeInfo.recommendations =
              recommendationsResponse?.data || undefined;
            return this.apiService.getAnimeRelations(this.animeID!).pipe(
              delay(500),
              catchError((err) => {
                this.error = 'Error fetching relations';
                return of(null);
              })
            );
          })
        )
        .subscribe({
          next: (relationsResponse) => {
            this.animeInfo.relations = relationsResponse?.data || undefined;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error in sequential requests:', error);
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

  get relationsPrequel() {
    return this.animeInfo.relations?.filter(
      (a) => a.relation === 'Prequel' || a.relation === 'Sequel'
    );
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
