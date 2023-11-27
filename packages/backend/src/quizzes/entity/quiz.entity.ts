import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from './category.entity';
import { Keyword } from './keyword.entity';

@Entity()
export class Quiz extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.quizzes)
  category: Category;

  @ManyToMany(() => Keyword, (keyword) => keyword.quizzes)
  @JoinTable()
  keywords: Keyword[];
}
