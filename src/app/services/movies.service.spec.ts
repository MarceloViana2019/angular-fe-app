import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { YearsWinners } from '../models/years-winners';
import { Studios } from '../models/studios';
import { Producers } from '../models/producers';
import { Movie } from '../models/movie';
import { ListMovies } from '../models/list-movies';

const URL_BASE = "https://tools.texoit.com/backend-java/api/movies";
const URL_PARAM_WINNERS = "?projection=years-with-multiple-winners";
const URL_PARAM_STUDIOS = "?projection=studios-with-win-count";
const URL_PARAM_PRODUCERS = "?projection=max-min-win-interval-for-producers";
const URL_PARAM_MOVIE_WINNER = "?winner=true&year=";


describe('MoviesService', () => {
  let httpTestingController: HttpTestingController;
  let movieService: MovieService;
  let listMovies: ListMovies;
  let yearsWinners: YearsWinners;
  let studios: Studios;
  let producers: Producers;
  let movie: Movie;
  let page: number = 1;
  let size: number = 4;
  let winner: boolean = true;
  let year: number = 1990;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    listMovies = {
      content: [
        { id: 999, year: 1900, title: "Movie Title", studios: ["Studio Name"], producers: ["Producer Name"], winner: true },
        { id: 999, year: 1900, title: "Movie Title", studios: ["Studio Name", "Studio Name"], producers: ["Producer Name"], winner: false }
      ],
      pageable:
      {
        sort:
        {
          sorted: false,
          unsorted: true
        },
        pageSize: 0,
        pageNumber: 0,
        offSet: 0,
        paged: true,
        unpaged: false
      },
      totalElements: 999,
      last: false,
      totalPages: 99,
      first: true,
      sort:
      {
        sorted: false,
        unsorted: true
      },
      number: 0,
      numberOfElements: 99,
      size: 99,
      empty: false
    }

    yearsWinners = { years: [{ year: 1986, winnerCount: 2 }] };

    studios = { studios: [{ name: "Columbia Pictures", winCount: 9 }] };

    producers = {
      max: [
        {
          producer: "Producer Name",
          interval: 99,
          previousWin: 1900,
          followingWin: 1999
        }
      ],
      min: [
        {
          producer: "Producer Name",
          interval: 9,
          previousWin: 2018,
          followingWin: 2019
        }
      ]
    };

    movie = { id: 99, year: 1990, title: "Movie Title", studios: ["Studio Name"], producers: ["Producer Name"], winner: true };

  });

  beforeEach(inject(
    [MovieService],
    (service: MovieService) => {
      movieService = service;
    }
  ));

  it('should be able to create a service', inject([MovieService], (movieService: MovieService) => {
    expect(movieService).toBeDefined();
  }));

  //ListMovies
  it("should return list movies data", () => {
    let result: ListMovies;
    movieService.getListMovies(page, size, winner, year).subscribe(data => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${URL_BASE}${'?page='}${page}${'&size='}${size}${'&winner='}${winner}${'&year='}${year}`
    });

    req.flush([listMovies]);
    expect(result[0]).toEqual(listMovies);
  });

  it("should throw error list movies", () => {
    let error: string;
    movieService.getListMovies(page, size, winner, year)
      .subscribe(() => { },
        (e) => {
          error = e
        }
      );

    let req = httpTestingController.expectOne(`${URL_BASE}${'?page='}${page}${'&size='}${size}${'&winner='}${winner}${'&year='}${year}`);
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error.indexOf("Error retrieving list movies data") >= 0).toBeTruthy();
  });

  //Winners
  it("should return years winners data", () => {
    let result: YearsWinners;
    movieService.getWinners().subscribe(data => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${URL_BASE}${URL_PARAM_WINNERS}`
    });

    req.flush([yearsWinners]);
    expect(result[0]).toEqual(yearsWinners);
  });

  it("should throw error years winners", () => {
    let error: string;
    movieService.getWinners()
      .subscribe(() => { },
        (e) => {
          error = e
        }
      );

    let req = httpTestingController.expectOne(`${URL_BASE}${URL_PARAM_WINNERS}`);
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error.indexOf("Error retrieving years winners data") >= 0).toBeTruthy();
  });

  //Studios
  it("should return studios data", () => {
    let result: Studios;
    movieService.getStudios().subscribe(data => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${URL_BASE}${URL_PARAM_STUDIOS}`
    });

    req.flush([studios]);
    expect(result[0]).toEqual(studios);
  });

  it("should throw error studios", () => {
    let error: string;
    movieService.getStudios()
      .subscribe(() => { },
        (e) => {
          error = e
        }
      );

    let req = httpTestingController.expectOne(`${URL_BASE}${URL_PARAM_STUDIOS}`);
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error.indexOf("Error retrieving studios data") >= 0).toBeTruthy();
  });

  //Producers
  it("should return producers data", () => {
    let result: Producers;
    movieService.getProducers().subscribe(data => {
      result = data;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${URL_BASE}${URL_PARAM_PRODUCERS}`
    });

    req.flush([producers]);
    expect(result[0]).toEqual(producers);
  });

  it("should throw error studios", () => {
    let error: string;
    movieService.getProducers()
      .subscribe(() => { },
        (e) => {
          error = e
        }
      );

    let req = httpTestingController.expectOne(`${URL_BASE}${URL_PARAM_PRODUCERS}`);
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error.indexOf("Error retrieving producers data") >= 0).toBeTruthy();
  });

  //Movie winner by year
  it("should return movie winner data", () => {
    let result: Movie;
    movieService.getMovieWinner(year).subscribe(data => {
      result = data[0];
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${URL_BASE}${URL_PARAM_MOVIE_WINNER}${year}`
    });

    req.flush([movie]);
    expect(result).toEqual(movie);
  });

  it("should throw error movie winner", () => {
    let error: string;
    movieService.getMovieWinner(year)
      .subscribe(() => { },
        (e) => {
          error = e
        }
      );

    let req = httpTestingController.expectOne(`${URL_BASE}${URL_PARAM_MOVIE_WINNER}${year}`);
    req.flush("Something went wrong", {
      status: 404,
      statusText: "Network error"
    });

    expect(error.indexOf("Error retrieving movies winner data") >= 0).toBeTruthy();
  });


});
