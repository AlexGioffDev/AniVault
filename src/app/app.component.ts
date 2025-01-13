import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'AniVault';

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    let data = this.apiService.getInfo();
    data.subscribe((d) => {
      console.log(d);
    })
  }
}
