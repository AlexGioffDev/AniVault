import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { AnimeDataInfo } from '../../models/Anime';


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
  anime!: AnimeDataInfo

  constructor(private apiService: ApiService){
    this.animeID = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.apiService.getAnime(this.animeID!).subscribe((anime) => {
      this.isLoading = false;
      this.anime = anime.data;
      console.log(this.anime);
    })
  }

}
