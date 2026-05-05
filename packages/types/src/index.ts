export interface ITask {
  id: number;
  name: string;
  description: string;
  // status: 0 - pending, 1 - in progress, 2 - completed
  status: number
  creaetedBy: number;
  createdAt: Date;
  updatedAt: Date;
  isCompleted: boolean;
}
