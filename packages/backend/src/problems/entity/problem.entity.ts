import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinTable,
  ManyToMany, ManyToOne,
} from 'typeorm';
import { Keyword } from './keyword.entity';
import { Category } from './category.entity';

@Entity()
export class Problem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => Category, (category) => category.problems)
  category: Category;

  @ManyToMany(() => Keyword, (keyword) => keyword.problems)
  @JoinTable()
  keywords: Keyword[];
}
