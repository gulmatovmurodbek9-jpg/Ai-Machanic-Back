import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Dushanbe' })
  city: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: 'Starter' })
  plan: string;

  @CreateDateColumn()
  createdAt: Date;
}
