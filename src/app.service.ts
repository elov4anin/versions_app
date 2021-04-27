import { HttpService, Injectable } from '@nestjs/common';
import * as gplay from 'google-play-scraper';

import * as cheerio from 'cheerio';
import { getUri } from './Shared/utils';

@Injectable()
export class AppService {
  constructor(private _httpService: HttpService) {
  }
  async getVersionCodeFromGoogle(appId): Promise<string> {
    const result = await gplay.app({ appId });
    return JSON.stringify({
      version: result.version,
    });
  }

  async getVersionCodeFromAppStore(trackId: string): Promise<string> {
    const res = await this._httpService.get(getUri(trackId)).toPromise();
    const $ = cheerio.load(res.data);
    const version = $('p.whats-new__latest__version')
      .html()
      .replace(/[^.0-9]+/g, '');
    return JSON.stringify({
      version,
    });
  }
}
