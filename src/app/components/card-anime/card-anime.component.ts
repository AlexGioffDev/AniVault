import { Component, Input } from '@angular/core';
import { Datum } from '../../models/AnimeSearch';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-anime',
  imports: [RouterLink],
  templateUrl: './card-anime.component.html',
  styleUrl: './card-anime.component.css'
})
export class CardAnimeComponent {

  @Input() anime!: Datum;
}
