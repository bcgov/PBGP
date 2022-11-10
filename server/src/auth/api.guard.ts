import { ExecutionContext, Injectable, UnauthorizedException, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from './jwt.guard';

@Injectable()
export class APIAuthGuard implements CanActivate {
  jwtGuard: JwtAuthGuard;

  constructor(private readonly reflector: Reflector) {
    this.jwtGuard = new JwtAuthGuard();
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Allow the request if `isPublicRoute` is set as metadata on the given execution context
    // This happens for endpoints with the @PublicRoute decorator
    const isPublic = this.reflector.get<boolean>('isPublicRoute', context.getHandler());

    if (isPublic) {
      return true;
    }
    return this.jwtGuard.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      // Login failed
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
