import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import {
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUseTags,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Put('balance')
  @UseGuards(new JwtAuthGuard())
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Balance updated',
  })
  @ApiBadRequestResponse({
    description: 'Bad request.',
  })
  @ApiNotFoundResponse({
    description: 'User account not found.',
  })
  @ApiForbiddenResponse({
    description: 'Action forbidden.',
  })
  @ApiUnauthorizedResponse({
    description: 'Action unauthorized.',
  })
  updateBalance(
    @Req() req,
    @Body() payload: UpdateBalanceDto,
  ): Promise<IUser[]> {
    return this.usersService.updateBalance(
      req.payload.token.accountNumber,
      req.payload.token.ceiling,
      payload,
    );
  }

  @Post('transfer')
  transfer() {
    return this;
  }
}
