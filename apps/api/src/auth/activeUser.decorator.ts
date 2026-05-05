import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserPayload } from './IUserPayload';

export const ActiveUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as IUserPayload;
    return data ? user?.[data] : user;
  },
);
