import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator, CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Decorator that indicates to the APIAuthGuard that the given endpoint is public.
 * - Sets isPublicRoute to true on the current execution context
 * - The guard will allow the request if this is set on the current execution context
 */
export const PublicRoute = (): CustomDecorator => SetMetadata('isPublicRoute', true);

export const GetUser = createParamDecorator((_data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return {
    ...request.user.user,
    roles: request.user.client_roles,
  };
});
