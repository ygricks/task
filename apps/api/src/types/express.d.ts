import { IUserPayload } from '@my-project/types';

declare global {
  namespace Express {
    interface Request {
      cookies: {
        jwt?: string;
      };
      user?: IUserPayload;
    }
  }
}

// export {};
