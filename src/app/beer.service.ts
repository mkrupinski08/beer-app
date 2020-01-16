import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Beer } from './beer';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class BeerService {

  private baseUrl = 'https://api.punkapi.com/v2';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  private log(message: string) {
    this.messageService.add(`BeerService: ${message}`);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getBeers(): Observable<Beer[]> {
    const beersUrl = `${this.baseUrl}/beers`;
    return this.http.get<Beer[]>(beersUrl).pipe(
      tap(_ => this.log('fetched beers')),
      catchError(this.handleError<Beer[]>('getBeers', []))
      );
  }

}
