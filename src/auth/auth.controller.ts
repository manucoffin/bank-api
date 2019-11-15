import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({
    description: 'Logged in.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  login(@Body() payload: SignInDto): Promise<string> {
    return this.authService.signIn(payload.accountNumber, payload.pin);
  }

  @Get('logout')
  @ApiOkResponse({
    description: 'Logged out.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  logout(): Promise<void> {
    return this.authService.signOut();
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Account created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  async register(@Body() registerDto: RegisterDto) {
    // Pass the user entity to the service
    return this.authService.signUp(registerDto);
  }
}
