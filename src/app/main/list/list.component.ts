import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { Movies } from 'src/app/models/list-movies';
import { MovieService } from 'src/app/services/movie.service';

const MOVIE = {
  id: 99,
  year: 1990,
  title: "Movie Title",
  studios: ["Studio Name"],
  producers: ["Producer Name"],
  winner: true
}

const SORT = {
  sorted: false,
  unsorted: true,
}

const PAGEABLE = {
  sort: SORT,
  pageSize: 0,
  pageNumber: 0,
  offSet: 0,
  paged: true,
  unpaged: false
}

const MOVIE_DATA = {
  content: [MOVIE, MOVIE, MOVIE, MOVIE, MOVIE, MOVIE, MOVIE, MOVIE],
  pageable: PAGEABLE,
  totalElements: 999,
  last: false,
  totalPages: 99,
  first: true,
  sort: SORT,
  number: 0,
  numberOfElements: 99,
  size: 99
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  movies: Movie[];
  page = 1;
  pageSize = 4;
  collectionSize = MOVIE_DATA.content.length;



  constructor(private movieService: MovieService) {

    this.movieService.getMovies().subscribe(data => {
      console.log(data)
    });

    this.refreshMovies();
   }

  ngOnInit(): void {
    //this.movies = Object.assign([], MOVIE_DATA.content);
  }

  refreshMovies() {
    this.movies = MOVIE_DATA.content
      .map((movie, i) => ({id: i + 1, ...movie}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
