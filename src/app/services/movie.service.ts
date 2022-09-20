import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ListMovies } from '../models/list-movies';
import { Movie } from '../models/movie';
import { Producers } from '../models/producers';
import { Studios } from '../models/studios';
import { YearsWinners } from '../models/years-winners';

const URL_BASE = "https://tools.texoit.com/backend-java/api/movies";
const URL_PARAM_WINNERS = "?projection=years-with-multiple-winners";
const URL_PARAM_STUDIOS = "?projection=studios-with-win-count";
const URL_PARAM_PRODUCERS = "?projection=max-min-win-interval-for-producers";
const URL_PARAM_MOVIE_WINNER = "?winner=true&year=";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }


  public getListMovies(page: number, size: number, winner: string, year: string): Observable<any> {  
    return this.http.get<ListMovies>(`${URL_BASE}${'?page='}${page}${'&size='}${size}${'&winner='}${winner}${'&year='}${year}`)
      .pipe(
        map((response: ListMovies) => response),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `Error retrieving list movies data. ${error.statusText || "Unknown"} `
          );
        })
      );
  }

  public getWinners(): Observable<YearsWinners> {
    return this.http.get<any>(`${URL_BASE}${URL_PARAM_WINNERS}`)
      .pipe(
        map((response: YearsWinners) => response),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `Error retrieving years winners data. ${error.statusText || "Unknown"} `
          );
        })
      );
  }

  public getStudios(): Observable<Studios> {
    return this.http.get<any>(`${URL_BASE}${URL_PARAM_STUDIOS}`)
      .pipe(
        map((response: Studios) => response),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `Error retrieving studios data. ${error.statusText || "Unknown"} `
          );
        })
      );
  }

  public getProducers(): Observable<Producers> {
    return this.http.get<Producers>(`${URL_BASE}${URL_PARAM_PRODUCERS}`)
      .pipe(
        map((response: Producers) => response),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `Error retrieving producers data. ${error.statusText || "Unknown"} `
          );
        })
      );
  }

  public getMovieWinner(year: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${URL_BASE}${URL_PARAM_MOVIE_WINNER}${year}`)
      .pipe(
        map((response: Movie[]) => response),
        catchError((error: HttpErrorResponse) => {
          return throwError(
            `Error retrieving movies winner data. ${error.statusText || "Unknown"} `
          );
        })
      );
  }


}
