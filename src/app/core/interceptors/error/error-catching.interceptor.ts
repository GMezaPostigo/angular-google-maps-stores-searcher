import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { logout } from 'src/app/store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';

@Injectable({
  providedIn: 'root'
})
export class ErrorCatchingInterceptor implements HttpInterceptor {
  constructor(private router: Router, private store: Store<AppState>) {}
  errorMsg = '';
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse) {
          if ([401, 403].includes(error.status)) {
            this.store.dispatch(logout({ user: null }));
            this.router.navigateByUrl('/auth');
          }
        }
        error.error instanceof ErrorEvent
          ? (this.errorMsg = `Error: ${error.error.message}`)
          : (this.errorMsg = `Error Code: ${error.status},  Message: ${error.message}`);
        return throwError(() => this.errorMsg);
      })
    );
  }
}
