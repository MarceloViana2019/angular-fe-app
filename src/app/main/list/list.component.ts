import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie.service';
import { ListMovies } from 'src/app/models/list-movies';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  listMovies: ListMovies;
  movies: Movie[];
  filteredElements: Movie[];
  collectionSize: number;
  page: number;
  size: number;
  winnerFilter: any;
  yearFilter: any;
  timeOutId: any;



  constructor(private movieService: MovieService) {
    this.listMovies = new ListMovies();
    this.listMovies.content = [];
  }


  ngOnInit(): void {
    this.page = 1;
    this.size = 15;
    this.winnerFilter = "";
    this.yearFilter = "";
    this.getMovies();
  }

  getMovies() {
    this.movieService.getListMovies((this.page - 1), this.size, this.winnerFilter, this.yearFilter)
      .subscribe(data => {
        this.listMovies = data;
        this.collectionSize = this.listMovies.totalElements;
        this.movies = Object.assign([], this.listMovies.content);
      });
  }

  onSearchByYear() {
    if (this.timeOutId) {
      clearTimeout(this.timeOutId);
    };

    this.page = 1;
    this.size = 15;

    this.timeOutId = setTimeout(() =>
      this.movieService.getListMovies((this.page - 1), this.size, this.winnerFilter, this.yearFilter)
        .subscribe(data => {
          this.listMovies = data;
          this.collectionSize = this.listMovies.totalElements;
          this.movies = Object.assign([], this.listMovies.content);
        })
      , 1500);
  }

  onSearchByWinner() {
    this.page = 1;
    this.size = 15;

    this.movieService.getListMovies((this.page - 1), this.size, this.winnerFilter, this.yearFilter)
      .subscribe(data => {
        this.listMovies = data;
        this.collectionSize = this.listMovies.totalElements;
        this.movies = Object.assign([], this.listMovies.content);
      });

  }
}
