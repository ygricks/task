export enum TaskStatus {
  PENDING = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2
}

export interface ITask {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPayload {
  sub: number;
  username: string;
  email: string;
}

export type UserPayloadKey = keyof IUserPayload;

