/* eslint-disable @typescript-eslint/no-empty-object-type */
import { CreateTaskDto } from './create-task.dto';

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}
