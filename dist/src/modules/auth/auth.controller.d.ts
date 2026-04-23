import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    forgotPassword(input: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    me(request: {
        user: {
            sub: number;
        };
    }): Promise<{
        id: number;
        name: string;
        email: string;
        city: string;
        phone: string;
        plan: string;
        createdAt: Date;
    }>;
}
