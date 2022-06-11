import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";
import { Event } from "./Event";

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  eventId: string;

  @Column()
  secretCode: string;

  @Column()
  State: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Event)
  @JoinColumn()
  event: Event;
}
