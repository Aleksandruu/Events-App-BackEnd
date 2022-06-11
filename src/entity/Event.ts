import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  banner: string;

  @Column()
  category: number;

  @Column()
  description: string;

  @Column()
  requirements: string;

  @Column()
  cost: string;
}
