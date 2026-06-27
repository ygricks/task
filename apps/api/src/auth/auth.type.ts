import { IUserPayload } from '@my-project/types';
import { type Request } from 'express';

export interface IRequestWithJwt extends Request {
  cookies: {
    jwt?: string;
  };
  user?: IUserPayload;
}

export interface ISignData {
  username: string;
  password: string;
}
