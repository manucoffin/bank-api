import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SignOutDto } from './dto/sign-out.dto';

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

  @Post('logout')
  @UseGuards(new JwtAuthGuard())
  @ApiOkResponse({
    description: 'Logged out.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  logout(@Req() req, @Body() payload: SignOutDto): Promise<void> {
    return this.authService.signOut(req.payload.token.accountNumber);
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'Account created.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.signUp(registerDto);
  }
}
