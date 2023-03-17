import { InjectionToken } from '@angular/core';
import { UrlConstantsI } from '../interfaces';

export const URL_CONSTANTS = new InjectionToken<UrlConstantsI>('api_urls');

export const API_URLS: UrlConstantsI = {
  NBA_API: 'https://free-nba.p.rapidapi.com/',
};
