import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateTaskDto } from '../../../shared/dto/task/create-task.dto';
import { Message } from '../../../shared/interfaces/messages/message';
import { Task } from '../../models/task';
import { UpdateTaskDto } from '../../../shared/dto/task/update-task.dto';

declare const API_URL: string;

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private readonly apiUrl = API_URL + '/core/task';

  public create(createTaskDto: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, createTaskDto);
  }

  public findAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  public update(id: string, updateTaskDto: UpdateTaskDto): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}/${id}`, updateTaskDto);
  }

  public delete(id: string): Observable<Message> {
    return this.http.delete<Message>(`${this.apiUrl}/${id}`);
  }
}
