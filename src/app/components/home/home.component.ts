import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AnimeSearch } from '../../models/Anime';
import { CardAnimeComponent } from '../card-anime/card-anime.component';

@Component({
  selector: 'app-home',
  imports: [CardAnimeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  animes: AnimeSearch['data'] | undefined;
  page: number = 1;
  isLoading: boolean = true;
  nextPage: boolean = true;
  constructor(private apiService: ApiService) {
    
  };

  ngOnInit(): void {
    this.getAnime(this.page);
  }


  getAnime(page: number): void {
    this.apiService.getTopAnime(this.page).subscribe((d: AnimeSearch) => {
      this.isLoading = false;
      this.animes = d.data;
      this.nextPage = d.pagination.has_next_page;
    })
  }

  getNextAnimePage(): void {
    if(this.nextPage){
      this.page++;
      this.isLoading = true;
      this.getAnime(this.page);

    }
  }

  getPrevAnimePage(): void {
    if(this.page > 1){
      this.page--;
      this.isLoading = true;
      this.getAnime(this.page);

    }
  }

}
