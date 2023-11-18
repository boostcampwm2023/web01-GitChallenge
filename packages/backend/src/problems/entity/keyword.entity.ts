import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Problem } from './problem.entity';

@Entity()
export class Keyword extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string;

  @ManyToMany(() => Problem, (problem) => problem.keywords)
  problems: Problem[];
}
