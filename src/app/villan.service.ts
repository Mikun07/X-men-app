import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Villan } from './villan';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class VillanService {
  [x: string]: any;
  deleteVillan(id: number) {
    throw new Error('Method not implemented.');
  }
  private villansUrl = 'api/villans';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

    getVillans(): Observable<Villan[]> {
      return this.http.get<Villan[]>(this.villansUrl)
        .pipe(
          tap(_ => this.log('fetched villans')),
          catchError(this.handleError<Villan[]>('getVillans', []))
        );
    }
  
    /** GET hero by id. Return `undefined` when id not found */
    getVillanNo404<Data>(id: number): Observable<Villan> {
      const url = `${this.villansUrl}/?id=${id}`;
      return this.http.get<Villan[]>(url)
        .pipe(
          map(villans => villans[0]), // returns a {0|1} element array
          tap(v => {
            const outcome = v ? `fetched` : `did not find`;
            this.log(`${outcome} villan id=${id}`);
          }),
          catchError(this.handleError<Villan>(`getVillan id=${id}`))
        );
    }
  
    /** GET hero by id. Will 404 if id not found */
    getVillan(id: number): Observable<Villan> {
      const url = `${this.villansUrl}/${id}`;
      return this.http.get<Villan>(url).pipe(
        tap(_ => this.log(`fetched villan id=${id}`)),
        catchError(this.handleError<Villan>(`getVillan id=${id}`))
      );
    }
  
    /* GET heroes whose name contains search term */
    searchVillans(term: string): Observable<Villan[]> {
      if (!term.trim()) {
        // if not search term, return empty hero array.
        return of([]);
      }
      return this.http.get<Villan[]>(`${this.villansUrl}/?name=${term}`).pipe(
        tap(x => x.length ?
           this.log(`found villans matching "${term}"`) :
           this.log(`no villans matching "${term}"`)),
        catchError(this.handleError<Villan[]>('searchVillans', []))
      );
    }
  
    //////// Save methods //////////
  
    /** POST: add a new hero to the server */
    addVillan(villan: Villan): Observable<Villan> {
      return this.http.post<Villan>(this.villansUrl, villan, this.httpOptions).pipe(
        tap((newVillan: Villan) => this.log(`added villan w/ id=${newVillan.id}`)),
        catchError(this.handleError<Villan>('addVillan'))
      );
    }
  
    /** DELETE: delete the hero from the server */
    delete(id: number): Observable<Villan> {
      const url = `${this.villansUrl}/${id}`;
  
      return this.http.delete<Villan>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted villan id=${id}`)),
        catchError(this.handleError<Villan>('deleteVillan'))
      );
    }
  
    /** PUT: update the hero on the server */
    updateVillan(villan: Villan): Observable<any> {
      return this.http.put(this.villansUrl, villan, this.httpOptions).pipe(
        tap(_ => this.log(`updated Villan id=${villan.id}`)),
        catchError(this.handleError<any>('updateVillan'))
      );
    }
  
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`VilllanService: ${message}`);
    }
  }
