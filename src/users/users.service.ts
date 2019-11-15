import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IUser, IUserCredentials } from './interfaces/user.interface';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';

@Injectable()
export class UsersService {
  private readonly users: IUser[];

  constructor() {
    this.users = [
      {
        id: 1,
        accountNumber: '1111155555555M',
        username: 'test',
        pin: 123456,
        firstname: 'test',
        lastname: 'test',
        genre: 'm',
        birthdate: '17/06/1993',
        address: '1 test street',
        balance: 1000,
      },
      {
        id: 2,
        accountNumber: '2222255555555M',
        username: 'test2',
        pin: 123456,
        firstname: 'test2',
        lastname: 'test2',
        genre: 'f',
        birthdate: '17/06/1993',
        address: '2 test street',
        balance: 500,
      },
    ];
  }

  async findOne(username: string): Promise<IUser | undefined> {
    return this.users.find(user => user.username === username);
  }

  async findOneById(accountNumber: string): Promise<IUser | undefined> {
    return this.users.find(user => user.accountNumber === accountNumber);
  }

  async create(userData: RegisterDto): Promise<IUserCredentials> {
    return this.generateUserCredentials(userData);
  }

  private generateUserCredentials(userData: RegisterDto): IUserCredentials {
    return {
      accountNumber: '123456789111m',
      pin: 123456,
    };
  }

  async updateBalance(accountNumber, data: UpdateBalanceDto): Promise<IUser> {
    const user = this.users.find(u => u.accountNumber === accountNumber);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    if (data.amount < 0 && user.balance + data.amount < 0) {
      throw new ForbiddenException('Not enough money on this account.');
    } else {
      user.balance += data.amount;

      this.users.map(u => {
        if (u.accountNumber === accountNumber) {
          u = user;
          return u;
        }
      });

      return user;
    }
  }
}
