import { Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtPayload } from './jwt-payload.interface';
import { AppLogger } from '../common/logger.service';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(Logger) private readonly logger: AppLogger
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.KC_AUTH_URL}/realms/${process.env.KC_AUTH_REALM}/protocol/openid-connect/certs`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: `${process.env.KC_AUTH_URL}/realms/${process.env.KC_AUTH_REALM}`,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    if (!payload) {
      this.logger.warn(`Invalid token! ${JSON.stringify(payload)}`);
      done(new UnauthorizedException(), false);
    }

    payload.user = await this.authService.getUser(payload);

    if (!payload.user.isAuthorized) {
      this.logger.warn(`Unauthorized user! ${JSON.stringify(payload)}`);
      done(
        new UnauthorizedException({
          message: 'User does not have permission to access this page! Kindly contact BCAAP Admin!',
        }),
        false
      );
    }

    done(null, payload);
  }
}
