import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GetUser, PublicRoute } from './common/decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get current application version',
  })
  @ApiResponse({ status: HttpStatus.OK })
  @PublicRoute()
  @Get('/version')
  getVersion(): object {
    return this.appService.getVersionInfo();
  }

  @ApiResponse({ status: HttpStatus.OK })
  @Get('/validate')
  validateUser(@GetUser() user): object {
    return user;
  }
}
