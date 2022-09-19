import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Producers } from 'src/app/models/producers';
import { Studios } from 'src/app/models/studios';
import { YearsWinners } from 'src/app/models/years-winners';
import { MovieService } from 'src/app/services/movie.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  yearsWinners: YearsWinners;
  studios: Studios;
  producers: Producers;
  movie: Movie;
  year: number;
  movies: Movie[];

  constructor(private movieService: MovieService) {
    this.yearsWinners = new YearsWinners();
    this.yearsWinners.years = [];
    this.studios = new Studios();
    this.studios.studios = [];
    this.producers = new Producers();
    this.producers.max = [];
    this.producers.min = [];
    this.movie = new Movie();
  }

  ngOnInit(): void {
    this.movieService.getWinners()
    .subscribe(data => {
      this.yearsWinners = data;
    });

    this.movieService.getStudios()
    .subscribe(data => {
      this.studios.studios = data.studios.sort((a, b) => (a.winCount < b.winCount) ? 1 : -1);
    });

    this.movieService.getProducers()
    .subscribe(data => {
      this.producers = data;
    });

  }

  onSearchByYear(){
    this.movieService.getMovieWinner(this.year)
    .subscribe(data => {
      this.movie = data[0];
    });

  }

}
