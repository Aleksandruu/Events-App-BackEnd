import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

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
}
