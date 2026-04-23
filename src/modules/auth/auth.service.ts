import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';
import { Repository } from 'typeorm';
import { User } from '../../config/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: RegisterDto) {
    const existing = await this.usersRepository.findOne({
      where: { email: input.email.toLowerCase() },
    });

    if (existing) {
      throw new ConflictException('An account with this email already exists');
    }

    const user = this.usersRepository.create({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      password: this.hashPassword(input.password),
      city: input.city?.trim() || 'Dushanbe',
      phone: input.phone?.trim() || '',
      plan: 'Starter',
    });

    const savedUser = await this.usersRepository.save(user);
    return this.buildAuthResponse(savedUser);
  }

  async login(input: LoginDto) {
    const user = await this.usersRepository.findOne({
      where: { email: input.email.trim().toLowerCase() },
    });

    if (!user || !this.verifyPassword(input.password, user.password)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  async me(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.serializeUser(user);
  }

  async requestPasswordReset(input: ForgotPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { email: input.email.trim().toLowerCase() },
    });

    return {
      message: user
        ? 'Reset instructions have been sent to your email'
        : 'If this email exists, reset instructions have been sent',
    };
  }

  private buildAuthResponse(user: User) {
    const expiresIn = 60 * 60 * 24 * 2;
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET || 'ai-mechanic-dev-secret',
        expiresIn,
      },
    );

    return {
      accessToken,
      expiresIn,
      user: this.serializeUser(user),
    };
  }

  private serializeUser(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      city: user.city,
      phone: user.phone,
      plan: user.plan,
      createdAt: user.createdAt,
    };
  }

  private hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, stored: string) {
    const [salt, originalHash] = stored.split(':');
    const comparisonHash = scryptSync(password, salt, 64);
    const originalBuffer = Buffer.from(originalHash, 'hex');
    return timingSafeEqual(originalBuffer, comparisonHash);
  }
}
