import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './address.model';

@Entity({
  name: 'users',
  orderBy: {
    name: 'ASC',
    id: 'DESC',
  },
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'int4',
    nullable: false,
  })
  age: number;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  address: Address;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  additional_info: { [key: string]: any };
}
