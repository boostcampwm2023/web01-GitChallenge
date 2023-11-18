import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Problem } from './problem.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Problem, (problem) => problem.category)
  problems: Problem[];
}
