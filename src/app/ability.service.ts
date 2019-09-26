import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { Ability, Hero } from './hero';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AbilityService {
  baseUrl = 'http://localhost:3100/api/heroes/:hero_id/abilities';
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  addAbility (hero: Hero, ability: Ability): Observable<Ability> {
    return this.http.post<Ability>(this.baseUrl.replace(':hero_id', hero._id), ability).pipe(
      tap(_ =>  this.log(`add ability to hero=${hero._id}`)),
      catchError(this.handleError<any>('addAbility'))
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
