import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Event } from "./Event";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Event, (event) => event.user) events: Event[];
}
