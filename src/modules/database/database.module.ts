import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users/users.entity';
import { UsersService } from './entities/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [DatabaseService, UsersService],
  exports: [TypeOrmModule, DatabaseService, UsersService],
})
export class DatabaseModule {
  constructor() {
    // console.log('DB Module init');
  }
}
