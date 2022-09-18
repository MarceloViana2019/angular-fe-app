import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { Producers } from '../models/producers';
import { Studios } from '../models/studios';
import { YearWinner } from '../models/year-winner';
import { YearsWinners } from '../models/years-winners';

const URL = "https://tools.texoit.com/backend-java/api/movies";;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  public getMovies(): Observable<any>{
    let url = "https://tools.texoit.com/backend-java/api/movies?projection=years-with-multiple-winners";
    return this.http.get(url);
  }

  public getWinners(projection: string): Observable<YearsWinners>{
    return this.http.get<YearsWinners>(URL + '?projection=' + projection)
    .pipe(
      map((response: YearsWinners) => response)
    );
  }

  public getStudios(projection: string): Observable<Studios>{
    return this.http.get<Studios>(URL + '?projection=' + projection)
    .pipe(
      map((response: Studios) => response)
    );
  }

  public getProducers(projection: string): Observable<Producers>{
    return this.http.get<Producers>(URL + '?projection=' + projection)
    .pipe(
      map((response: Producers) => response)
    );
  }

  public getMovieWinner(year: number): Observable<Movie[]>{
    return this.http.get<Movie[]>(URL + '?winner=true' + '&year=' + year)
    .pipe(
      map((response: Movie[]) => response)
    );
  }


}
