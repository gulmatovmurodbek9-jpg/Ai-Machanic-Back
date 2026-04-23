import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Diagnosis } from '../diagnosis/diagnosis.entity';

@Entity('quotes')
export class Quote {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'uuid' })
  @Column()
  diagnosisId: string;

  @ApiProperty({ example: 450.0 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  quotedAmount: number;

  @ApiPropertyOptional({ example: 'John\'s Auto Shop' })
  @Column({ nullable: true })
  mechanicName: string;

  @ApiPropertyOptional({ example: 'Includes parts and labor' })
  @Column({ type: 'text', nullable: true })
  mechanicNotes: string;

  @ApiProperty({ enum: ['FAIR', 'OVERPRICED', 'CHEAP'] })
  @Column()
  verdict: string;

  @ApiProperty({ example: 15.5 })
  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  percentageDifference: number;

  @ApiProperty({ example: 'The quote is within market range.' })
  @Column({ type: 'text', nullable: true })
  explanation: string;

  @ApiPropertyOptional()
  @Column({ type: 'simple-json', nullable: true })
  recommendedRange: { min: number; max: number };

  @ApiPropertyOptional()
  @Column({ type: 'simple-json', nullable: true })
  breakdown: { partsEstimate: number; laborEstimate: number; reasonableTotal: number };

  @ApiPropertyOptional({ type: [String] })
  @Column({ type: 'simple-json', nullable: true })
  negotiationTips: string[];

  @ApiPropertyOptional({ example: 50 })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  savingsPotential: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Diagnosis, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'diagnosisId' })
  diagnosis: Diagnosis;
}
