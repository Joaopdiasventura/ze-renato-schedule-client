import { TaskStatus } from "./status.enum";

export interface Task {
  _id: string;
  title: string;
  status: TaskStatus;
}
