import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPlace } from 'src/app/shared/interfaces/place.interface';
import { IStore } from 'src/app/shared/interfaces/store.interface';
import { catchError, tap } from 'rxjs/operators';
import { INearbyPlace } from '@shared/interfaces/nearbyPlace.interface';

@Injectable({
  providedIn: 'root'
})
export class MapsService {
  constructor(private http: HttpClient) {}

  getAutocompletePlaces(address: string): Observable<IPlace[]> {
    if (!address?.trim()) {
      return of([]);
    }
    return this.http
      .get<IPlace[]>(`${environment.baseUrl}/maps/placeAutocomplete/${address}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found place matching "${address}"`)
            : this.log(`no place matching "${address}"`)
        ),
        catchError(this.handleError<IPlace[]>('getAutocompletePlaces', []))
      );
  }

  getNearStores(placeId: string): Observable<INearbyPlace> {
    return this.http
      .get<INearbyPlace>(`${environment.baseUrl}/maps/nearStores/${placeId}`)
      .pipe(
        tap((x) =>
          x.stores.length
            ? this.log(`found stores matching "${placeId}"`)
            : this.log(`no store matching "${placeId}"`)
        ),
        catchError(
          this.handleError<INearbyPlace>('getAutocompletePlaces', {
            stores: [],
            latLngLiteral: undefined
          })
        )
      );
  }
  private log(message: string) {
    console.log(`MapsService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
