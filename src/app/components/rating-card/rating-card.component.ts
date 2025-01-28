import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating-card',
  imports: [NgClass],
  templateUrl: './rating-card.component.html',
  styleUrl: './rating-card.component.css',
})
export class RatingCardComponent {
  @Input() rating: string = '';
  @Input() type: string = 'everyone';
}
