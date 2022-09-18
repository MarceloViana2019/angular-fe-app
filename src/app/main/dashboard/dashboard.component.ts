import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Producers } from 'src/app/models/producers';
import { Studios } from 'src/app/models/studios';
import { YearsWinners } from 'src/app/models/years-winners';
import { MovieService } from 'src/app/services/movie.service';

// const YEAR_WINNER = {
//   year: 9999,
//   winnerCount: 99,
// }

// const YEAR_WINNER_DATA = {
//   years: [YEAR_WINNER, YEAR_WINNER],
// }

// const STUDIO = {
//   name: "Studio Name",
//   winCount: 9,
// }

// const STUDIO_DATA = {
//   studios: [STUDIO, STUDIO]
// }

// const PRODUCER_MIN = {
//   producer: "Producer Name",
//   interval: 9,
//   previousWin: 2018,
//   followingWin: 2019,
// }

// const PRODUCER_MAX = {
//   producer: "Producer Name",
//   interval: 99,
//   previousWin: 1900,
//   followingWin: 1999,
// }

// const PRIZE_INTERVAL_DATA = {
//   min: [PRODUCER_MIN],
//   max: [PRODUCER_MAX]
// }

// const MOVIE = {
//   id: 99,
//   year: 1990,
//   title: "Movie Title",
//   studios: ["Studio Name"],
//   producers: ["Producer Name"],
//   winner: true
// }


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
    this.movieService.getWinners('years-with-multiple-winners')
    .subscribe(data => {
      this.yearsWinners = data;
    });

    this.movieService.getStudios('studios-with-win-count')
    .subscribe(data => {
      this.studios.studios = data.studios.sort((a, b) => (a.winCount < b.winCount) ? 1 : -1);
    });

    this.movieService.getProducers('max-min-win-interval-for-producers')
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
