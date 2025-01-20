import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AnimeDataInfo } from '../../models/Anime';
import {  AnimeCharactersInfo } from '../../models/AnimeCharacters';
import { AnimeReviewsData } from '../../models/AnimeReviews';


@Component({
  selector: 'app-anime',
  imports: [],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.css'
})
export class AnimeComponent implements OnInit {
  isLoading: boolean = true;
  private activatedRoute = inject(ActivatedRoute);
  animeID?: number;
  animeInfo: {
    anime?: AnimeDataInfo,
    characters?: AnimeCharactersInfo[],
    reviews?: AnimeReviewsData[]
  } = {}; 
  error?: string;

  constructor(private apiService: ApiService) {
    this.animeID = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.animeID) {
      this.apiService.getAnime(this.animeID).subscribe({
        next: (anime) => {
          this.animeInfo.anime = anime.data;
          
        },
        error: (err) => {
          this.error = 'Errore durante il caricamento dell\'anime';
          this.isLoading = false;
        }
      });

      this.apiService.getAnimeCharacters(this.animeID).subscribe({
        next: (anime) => {
          this.animeInfo.characters = anime.data;
        },
        error: (err) => {
          this.error = 'Errore durante il caricamento dei personaggi';
          this.isLoading = false;
        }
      });

      this.apiService.getAnimeReviews(this.animeID).subscribe({
        next: (anime) => {
          this.animeInfo.reviews = anime.data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Errore durante il caricamento delle recensioni';
          this.isLoading = false;
        }
      });
    }
  }

  get sortedCharacters() {
    return this.animeInfo.characters?.sort((a, b) => b.favorites - a.favorites).slice(0, 15);
  }
}