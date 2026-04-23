import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('obd_logs')
export class ObdLog {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: [String], example: ['P0300', 'P0171'] })
  @Column({ type: 'simple-json' })
  codes: string[];

  @ApiPropertyOptional({ example: 'uuid' })
  @Column({ nullable: true })
  diagnosisId: string;

  @ApiPropertyOptional({ example: { rpm: 750, temperature: 90 } })
  @Column({ type: 'simple-json', nullable: true })
  sensorData: Record<string, number>;

  @ApiPropertyOptional({ type: [Object] })
  @Column({ type: 'simple-json', nullable: true })
  analysis: Array<{ code: string; description: string; severity: string; recommendation: string }>;

  @ApiProperty({ enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], nullable: true })
  @Column({ nullable: true })
  overallSeverity: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;
}
