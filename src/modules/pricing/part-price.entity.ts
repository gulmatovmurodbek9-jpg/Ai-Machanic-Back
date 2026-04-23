import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('part_prices')
export class PartPrice {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Brake Pads' })
  @Column()
  partName: string;

  @ApiProperty({ example: 'Toyota' })
  @Column()
  carMake: string;

  @ApiProperty({ example: 'Camry' })
  @Column()
  carModel: string;

  @ApiPropertyOptional({ example: 2020 })
  @Column({ nullable: true })
  carYear: number;

  @ApiProperty({ example: 45.99 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiProperty({ example: 'AutoZone' })
  @Column()
  source: string;

  @ApiPropertyOptional({ example: 'https://autozone.com/...' })
  @Column({ nullable: true })
  sourceUrl: string;

  @ApiPropertyOptional({ example: 'AZ-12345' })
  @Column({ nullable: true })
  partNumber: string;

  @ApiProperty()
  @CreateDateColumn()
  updatedAt: Date;
}
