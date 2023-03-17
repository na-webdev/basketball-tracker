import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_CONSTANTS } from '../constants';
import { UrlConstantsI } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TeamStatsService {
  readonly NBA_API: string;
  constructor(
    private http: HttpClient,
    @Inject(URL_CONSTANTS) private API_URLS: UrlConstantsI
  ) {
    this.NBA_API = this.API_URLS.NBA_API;
  }
}
