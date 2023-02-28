import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  And,
  DataSource,
  InsertResult,
  LessThan,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    if (process.env.DATABASE_EMPTY) {
      usersRepository.clear();
    }
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  findStat() {
    const lesss20 = this.usersRepository.count({
      where: [
        {
          age: LessThan(20),
        },
      ],
    });
    const between20To40 = this.usersRepository.count({
      where: [
        {
          age: And(LessThan(40), MoreThanOrEqual(20)),
        },
      ],
    });
    const between40To60 = this.usersRepository.count({
      where: [
        {
          age: And(LessThan(60), MoreThanOrEqual(40)),
        },
      ],
    });
    const moreThan60 = this.usersRepository.count({
      where: [
        {
          age: MoreThan(60),
        },
      ],
    });
    return Promise.all([lesss20, between20To40, between40To60, moreThan60]);
  }

  addOne(user: User): Promise<InsertResult> {
    return this.usersRepository.insert(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
