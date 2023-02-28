import { Controller, Get } from '@nestjs/common';
import { User } from 'src/modules/database/entities/users/users.entity';
import { UsersService } from 'src/modules/database/entities/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('/stat')
  stat(): Promise<any[]> {
    return this.usersService.findStat();
  }
}
