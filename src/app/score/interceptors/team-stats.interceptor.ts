import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../../environments';

@Injectable()
export class TeamStatsInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const modifiedRequest = request.clone({
      headers: new HttpHeaders({
        'X-RapidAPI-Key': ENVIRONMENT.X_RAPID_API_KEY,
        'X-RapidAPI-Host': ENVIRONMENT.X_RAPID_API_HOST,
      }),
    });
    return next.handle(modifiedRequest);
  }
}
