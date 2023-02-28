import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './modules/database/entities/users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UsersService,
  ) {}

  @Get()
  @Render('index')
  async root() {
    const stat = await this.userService.findStat();
    return {
      lessThan20: stat[0],
      between20To40: stat[1],
      between40To60: stat[2],
      greaterThan60: stat[3],
    };
  }
}
