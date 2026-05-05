import { NgStyle } from '@angular/common';
import { TaskService } from './../../services/task-service';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-details',
  imports: [RouterLink, NgStyle],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css',
})
export class TaskDetails {
  route = inject(ActivatedRoute);
  taskId = signal<number | null>(null);
  taskService = inject(TaskService);
  task = computed(() => {
    const id = this.taskId();

    if (!id) return undefined;

    return this.taskService.getTask(id);
  });
  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId.set(+id);
    }
  }
}
