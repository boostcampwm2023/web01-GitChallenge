import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {Quiz} from "./quiz.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Quiz, (quiz) => quiz.category)
  quizzes: Quiz[];
}
