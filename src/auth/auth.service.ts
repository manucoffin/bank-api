import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IUserCredentials } from '../users/interfaces/user.interface';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Check that the password matches the hash
   * @param password
   * @param hash
   * @returns {boolean}
   */
  public async compareHash(
    password: number | undefined,
    hash: number | undefined,
  ): Promise<boolean> {
    return bcrypt.compare('' + password, '' + hash);
  }

  /**
   * Returns a signed JWT token
   * @param accountNumber
   * @returns {string} - signed token
   */
  public createToken(accountNumber: string): string {
    const ceiling = 500;
    const jwtPayload: IJwtPayload = { accountNumber, ceiling };
    return this.jwtService.sign({ token: jwtPayload });
  }
  /**
   * Returns a hashed string
   * @param password
   * @returns Hashed string
   */
  public async getHash(password: string | undefined): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Returns a token if the credentials are correct
   * @param accountNumber
   * @param pin
   * @throws {BadRequestException} - If some of the credentials are missing
   * @throws {ForbiddenException} - If user is not found
   * @returns Resolves with a token
   */
  public async signIn(accountNumber: string, pin: number): Promise<string> {
    if (!accountNumber || !pin) {
      throw new BadRequestException('Account number and pin are required.');
    }

    const user = await this.usersService.findOneById(accountNumber);

    if (user) {
      if (pin === user.pin) {
        const token = await this.createToken(user.accountNumber);
        this.usersService.setToken(user.accountNumber, token);

        return token;
      }
    }

    throw new ForbiddenException('Invalid credentials.');
  }

  public async signOut(accountNumber: string): Promise<void> {
    return await this.usersService.logout(accountNumber);
  }

  /**
   * Register the user in DB
   * @param user
   * @returns Resolves with User Credentials
   */
  public async signUp(user: RegisterDto): Promise<IUserCredentials> {
    return this.usersService.create(user);
  }

  /**
   * Check that the token is valid
   * @param payload -
   * @returns {boolean} - true if the token is valid
   */
  public async validateToken(payload: any): Promise<boolean> {
    const user = await this.usersService.findOneById(
      payload.token.accountNumber,
    );
    return !!user;
  }
}
