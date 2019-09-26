import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  baseUrl = 'http://localhost:3100/api/heroes';

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  getHeroes (count: number = 0): Observable<Hero[]> {
    const params = {};

    if (count > 0) {
      params['limit'] = count;
    }
    return this.http.get<Hero[]>(this.baseUrl, { params: params }).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError('getHeroes', []))
    );
  }

  searchHeroes (term: string): Observable<Hero[]> {
    const params = {};
    term = term.trim();
    if (!term) {
      return of([]);
    }
    params['term'] = term;
    return this.http.get<Hero[]>(this.baseUrl, { params: params }).pipe(
      tap(_ => this.log('search heroes')),
      catchError(this.handleError('searchHeroes', []))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.baseUrl, hero).pipe(
      tap((h: Hero) => this.log(`Create hero id=${h._id}`)),
      catchError(this.handleError<Hero>(`addHero`))
    );
  }

  getHero (id: string): Observable<Hero> {
    return this.http.get<Hero>(this.baseUrl + `/${id}`).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.baseUrl + `/${hero._id}`, hero).pipe(
      tap(_ => this.log(`Update hero id=${hero._id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(heroId: string): Observable<any> {
    return this.http.delete(this.baseUrl + `/${heroId}`).pipe(
      tap(_ => this.log(`Delete hero id=${heroId}`)),
      catchError(this.handleError<any>('deleteHero'))
    );
  }

  log(message: string) {
    this.messageService.add(message);
  }

  handleError<T> (operation= 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
