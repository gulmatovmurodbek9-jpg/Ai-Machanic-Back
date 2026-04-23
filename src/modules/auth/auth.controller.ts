import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new account and receive a JWT token' })
  @ApiResponse({ status: 201, description: 'Account created' })
  register(@Body() input: RegisterDto) {
    return this.authService.register(input);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login and receive a JWT token that expires in 2 days' })
  @ApiResponse({ status: 200, description: 'Authenticated' })
  login(@Body() input: LoginDto) {
    return this.authService.login(input);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request a password reset link' })
  @ApiResponse({ status: 200, description: 'Reset flow accepted' })
  forgotPassword(@Body() input: ForgotPasswordDto) {
    return this.authService.requestPasswordReset(input);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user profile' })
  @ApiResponse({ status: 200, description: 'Current user profile' })
  me(@Req() request: { user: { sub: number } }) {
    return this.authService.me(request.user.sub);
  }
}
