import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task/task.service';
import { Task } from '../../../core/models/task';
import { TaskStatus } from '../../../core/models/task/status.enum';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.scss'],
})
export class HomePage implements OnInit {
  public tasks: Task[] = [];

  public statusOptions = Object.values(TaskStatus);
  
  public statusLabels = {
    [TaskStatus.Awaiting]: 'Aguardando',
    [TaskStatus.InProgress]: 'Em Execução',
    [TaskStatus.Completed]: 'Concluído',
  };

  public taskForm = inject(FormBuilder).group({
    title: ['', Validators.required],
    status: [TaskStatus.Awaiting, Validators.required],
  });

  private taskService = inject(TaskService);

  public ngOnInit(): void {
    this.loadTasks();
  }

  public onSubmit(): void {
    if (this.taskForm.valid)
      this.taskService.create(this.taskForm.value as Task).subscribe({
        next: (result) => this.tasks.unshift(result),
      });
  }

  private loadTasks(): void {
    this.taskService
      .findAll()
      .subscribe({ next: (result) => (this.tasks = result) });
  }
}
