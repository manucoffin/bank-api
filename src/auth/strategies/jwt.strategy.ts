import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { configService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getString('JWT_SECRET'),
    });

    passport.use('jwt', this);
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authService.validateToken(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

// @Injectable()
// export class JwtStrategy extends Strategy {
//   constructor(private readonly authService: AuthService) {
//     super(
//       {
//         jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//         passReqToCallback: true,
//         secretOrKey: process.env.JWT_SECRET,
//       },
//       async (req, payload, next) => await this.verify(req, payload, next),
//     );
//     passport.use(this);
//   }
//
//   public async verify(req, payload, done) {
//     const isValid = await this.authService.validateUser(payload);
//     if (!isValid) {
//       return done('Unauthorized', false);
//     }
//     done(null, payload);
//   }
// }
