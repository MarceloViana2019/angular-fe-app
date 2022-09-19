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
  winner: boolean;
  year: string;
  collectionSize: number;

  page = 1;
  size = 15;


  constructor(private movieService: MovieService) {
    this.listMovies = new ListMovies();
    this.listMovies.content = [];
    this.refreshMovies();
  }

  ngOnInit(): void {
    this.movieService.getListMovies()
      .subscribe(data => {
        this.listMovies = data;
        this.collectionSize = this.listMovies.content.length;
        this.movies = this.listMovies.content
          .map((movie, i) => ({ id: i + 1, ...movie }))
          .slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size);
      });
  }

  refreshMovies() {
    this.movies = this.listMovies.content
      .map((movie, i) => ({ id: i + 1, ...movie }))
      .slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size);
  }

  refreshFilteredElements() {
    this.movies = this.filteredElements
      .map((movie, i) => ({ id: i + 1, ...movie }))
      .slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size);
  }

  onSearch(textSearch: string) {
    if (textSearch) {
      this.filteredElements = this.listMovies.content
        .filter(item =>
          item.year != null &&
          item.year
            .toString()
            .toLowerCase()
            .includes(textSearch.toLowerCase())
        )
      this.collectionSize = this.movies.length;
    } else {
      this.filteredElements = this.listMovies.content
      this.collectionSize = this.listMovies.content.length;
    }
    this.refreshFilteredElements();
  }

  onWinner(winner) {
    if (winner) {
      let filterWinner = winner == "1: true" ? true : false;
      this.filteredElements = this.listMovies.content
        .filter(item => item.winner == filterWinner);
      this.collectionSize = this.movies.length;
    } else {
      this.filteredElements = this.listMovies.content
      this.collectionSize = this.listMovies.content.length;
    }
    this.refreshFilteredElements();
  }


}
