import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({ example: 'demo@aimechanic.app' })
  @IsEmail()
  email: string;
}
