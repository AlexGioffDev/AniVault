import { Component, Input } from '@angular/core';
import { Datum } from '../../models/AnimeSearch';

@Component({
  selector: 'app-card-anime',
  imports: [],
  templateUrl: './card-anime.component.html',
  styleUrl: './card-anime.component.css'
})
export class CardAnimeComponent {

  @Input() anime!: Datum;
}
