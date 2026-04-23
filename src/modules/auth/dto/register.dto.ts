import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Firuz' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'demo@aimechanic.app' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'demo1234' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({ example: 'Dushanbe' })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiPropertyOptional({ example: '+992 90 000 0000' })
  @IsOptional()
  @IsString()
  phone?: string;
}
