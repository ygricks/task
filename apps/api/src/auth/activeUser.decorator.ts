import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserPayload, type UserPayloadKey } from '@my-project/types';
import { Request } from 'express';

// extend Express Request interface to include user property
declare module 'express' {
  export interface Request {
    user?: IUserPayload;
  }
}

function getUserPayloadValue<K extends keyof IUserPayload>(
  user: IUserPayload,
  key: K,
): IUserPayload[K] {
  return user[key];
}

export const ActiveUser = createParamDecorator(
  (data: UserPayloadKey, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = request.user as IUserPayload;
    return data ? getUserPayloadValue(user, data) : user;
  },
);
