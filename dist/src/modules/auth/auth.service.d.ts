import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../config/user.entity';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService);
    register(input: RegisterDto): Promise<{
        accessToken: string;
        expiresIn: number;
        user: {
            id: number;
            name: string;
            email: string;
            city: string;
            phone: string;
            plan: string;
            createdAt: Date;
        };
    }>;
    login(input: LoginDto): Promise<{
        accessToken: string;
        expiresIn: number;
        user: {
            id: number;
            name: string;
            email: string;
            city: string;
            phone: string;
            plan: string;
            createdAt: Date;
        };
    }>;
    me(userId: number): Promise<{
        id: number;
        name: string;
        email: string;
        city: string;
        phone: string;
        plan: string;
        createdAt: Date;
    }>;
    requestPasswordReset(input: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    private buildAuthResponse;
    private serializeUser;
    private hashPassword;
    private verifyPassword;
}
