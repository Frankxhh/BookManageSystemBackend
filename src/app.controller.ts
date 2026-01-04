import { Controller, Get, UseFilters } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';
import { Test } from './test';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 为单独路由添加过滤器
  // @UseFilters(AaaFilter)
  getHello(): string {
    // throw new Test('test', 18);
    return this.appService.getHello();
  }
}
