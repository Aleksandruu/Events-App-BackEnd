import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  mail: string;

  @Column({ unique: true })
  nume: string;

  @Column({ unique: true })
  parola: string;

  @Column({ unique: true })
  varsta: number;
}
