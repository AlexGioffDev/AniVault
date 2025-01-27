import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AnimeSearch } from '../../models/AnimeSearch';
import { CardAnimeComponent } from '../../components/card-anime/card-anime.component';
import { ActivatedRoute } from '@angular/router';
import { LoadingComponent } from '../../components/utils/loading/loading.component';

@Component({
  selector: 'app-home',
  imports: [CardAnimeComponent, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  animes: AnimeSearch['data'] | undefined;
  page: number = 1;
  isLoading: boolean = true;
  nextPage: boolean = true;
  type: string | null = null;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.type = params['type'];
      this.page = 1;
      this.getAnime(this.page, this.type);
    });
  }

  getAnime(page: number, type?: string | null): void {
    this.animes = [];
    this.isLoading = true;
    this.apiService.getTopAnime(this.page, type).subscribe((d: AnimeSearch) => {
      this.isLoading = false;
      this.animes = d.data;
      this.nextPage = d.pagination.has_next_page;
    });
  }

  getNextAnimePage(): void {
    if (this.nextPage) {
      this.page++;
      this.isLoading = true;
      this.getAnime(this.page, this.type);
    }
  }

  getPrevAnimePage(): void {
    if (this.page > 1) {
      this.page--;
      this.isLoading = true;
      this.getAnime(this.page, this.type);
    }
  }
}
