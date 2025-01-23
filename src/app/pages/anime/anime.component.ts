import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnimeDataInfo } from '../../models/Anime';
import { AnimeCharactersInfo } from '../../models/AnimeCharacters';
import { AnimeReviewsData } from '../../models/AnimeReviews';
import { AnimeRecommentationsInfo } from '../../models/AnimeRecommendations';

@Component({
  selector: 'app-anime',
  imports: [RouterLink],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css',
})
export class AnimeComponent implements OnInit {
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

  loadAnimeData(): void {
    this.animeInfo = {};
    this.isLoading = true;
    if (this.animeID) {
      this.apiService.getAnime(this.animeID).subscribe({
        next: (anime) => {
          this.animeInfo.anime = anime.data;
        },
        error: (err) => {
          this.error = "Errore durante il caricamento dell'anime";
          this.isLoading = false;
        },
      });

      this.apiService.getAnimeCharacters(this.animeID).subscribe({
        next: (anime) => {
          this.animeInfo.characters = anime.data;
        },
        error: (err) => {
          this.error = 'Errore durante il caricamento dei personaggi';
          this.isLoading = false;
        },
      });

      this.apiService.getAnimeReviews(this.animeID).subscribe({
        next: (anime) => {
          this.animeInfo.reviews = anime.data;
        },
        error: (err) => {
          this.error = 'Errore durante il caricamento delle recensioni';
          this.isLoading = false;
        },
      });
      this.apiService.getAnimeReviews(this.animeID).subscribe({
        next: (anime) => {
          this.animeInfo.reviews = anime.data;
        },
        error: (err) => {
          this.error = 'Errore durante il caricamento delle raccomandazioni';
          this.isLoading = false;
        },
      });

      this.apiService.getAnimeRecommendations(this.animeID).subscribe({
        next: (anime) => {
          this.isLoading = false;
          this.animeInfo.recommendations = anime.data;
        },
        error: (err) => {
          this.isLoading = false;
        },
      });
    }
  }

  get sortedCharacters() {
    return this.animeInfo.characters
      ?.filter((a) => a.voice_actors.length > 0)
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
