import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version_android')
  async getVersionCodeGoogle(@Req() request: Request): Promise<string> {
    console.log('test method android', request.query);
    const bundleName = request.query.bundleName;
    return await this.appService.getVersionCodeFromGoogle(bundleName);
  }

  @Get('version_ios')
  async getVersionCodeApple(@Req() request: Request): Promise<string> {
    console.log('test method ios', request.query);
    const trackId: number = +request.query.trackId;
    return await this.appService.getVersionCodeFromAppStore(trackId);
  }
}
