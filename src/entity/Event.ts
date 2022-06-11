import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./User";

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

  @ManyToOne(() => User, (user) => user.events) user: User;
}
