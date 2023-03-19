import { InjectionToken } from '@angular/core';
import { UrlConstantsI } from '../interfaces';
import { ENVIRONMENT } from '../../../environments';

export const URL_CONSTANTS = new InjectionToken<UrlConstantsI>('api_urls');

export const API_URLS: UrlConstantsI = {
  NBA_API: ENVIRONMENT.NBA_API,
};
