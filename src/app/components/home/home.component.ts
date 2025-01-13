import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AnimeSearch } from '../../models/Anime';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  animes: AnimeSearch['data'] | undefined;
  isLoading: boolean = true;
  constructor(private apiService: ApiService) {};

  ngOnInit(): void {
    this.apiService.getInfo().subscribe((d: AnimeSearch) => {
      console.log("From Home Page")
      console.log(d);
      this.isLoading = false;
      this.animes = d.data;
    })
  }

}
