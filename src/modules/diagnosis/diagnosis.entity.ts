import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('diagnoses')
export class Diagnosis {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  userId: number;

  @ApiProperty({ example: 'Toyota' })
  @Column()
  carMake: string;

  @ApiProperty({ example: 'Camry' })
  @Column()
  carModel: string;

  @ApiProperty({ example: 2020 })
  @Column()
  carYear: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  fileUrl: string;

  @ApiProperty({ enum: ['image', 'audio', 'video'] })
  @Column()
  fileType: string;

  @ApiProperty({ example: 'Worn brake pads' })
  @Column({ type: 'text' })
  problem: string;

  @ApiProperty({ example: 'Detailed diagnosis...' })
  @Column({ type: 'text' })
  diagnosis: string;

  @ApiProperty({ enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] })
  @Column({ default: 'MEDIUM' })
  severity: string;

  @ApiPropertyOptional({ example: 100 })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCostMin: number;

  @ApiPropertyOptional({ example: 300 })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  estimatedCostMax: number;

  @ApiPropertyOptional({ type: [String] })
  @Column({ type: 'simple-json', nullable: true })
  partsNeeded: string[];

  @ApiPropertyOptional({ example: 2 })
  @Column({ type: 'decimal', precision: 5, scale: 1, nullable: true })
  laborHours: number;

  @ApiPropertyOptional({ type: [String] })
  @Column({ type: 'simple-json', nullable: true })
  recommendations: string[];

  @ApiPropertyOptional()
  @Column({ type: 'simple-json', nullable: true })
  agentData: any;

  @ApiPropertyOptional({ example: 'Fix immediately' })
  @Column({ nullable: true })
  urgency: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany('Quote', 'diagnosis')
  quotes: any[];
}
