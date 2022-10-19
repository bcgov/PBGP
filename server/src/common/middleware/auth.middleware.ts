import {
  Injectable,
  InternalServerErrorException,
  NestMiddleware,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import jwksRsa from 'jwks-rsa';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    const token = extractToken(req.headers);
    const authUrl = 'https://keycloak.freshworks.club/auth';
    const authRealm = 'PBPG-dev';
    const authClientId = 'PBGP';

    const jwksUri = `${authUrl}/realms/${authRealm}/protocol/openid-connect/certs`;

    try {
      const jwksClient = jwksRsa({
        jwksUri,
      });
      const decoded = jwt.decode(token, { complete: true });
      const kid = decoded['header'].kid;
      const jwks = await jwksClient.getSigningKey(kid);
      const signingKey = jwks.getPublicKey();
      const verified = jwt.verify(token, signingKey);
      if (verified['azp'] !== authClientId) {
        throw new UnauthorizedException('Invalid authorized party');
      }
      const user = decoded.payload;
      res.locals.kcUser = user;

      // Retrieve user roles
      const resourceAccess = user['resource_access'];
      const ltcvx = resourceAccess && resourceAccess[process.env.AUTH_CLIENTID];
      const roles = ltcvx && ltcvx.roles;
      res.locals.roles = roles;
      next();
    } catch (e) {
      throw new InternalServerErrorException(
        e,
        'An unknown error occured while authenticating with Keyclaok'
      );
    }
  }
}

const extractToken = (headers: { [key: string]: string }): string => {
  if (headers.authorization) {
    const auth = headers.authorization.split(' ');
    const type = auth[0].toLowerCase();
    if (type !== 'bearer') {
      throw new UnauthorizedException(401, 'Invalid authentication header');
    }
    return auth[1];
  }

  throw new UnauthorizedException('No authentication token found');
};
