import { NgStyle } from '@angular/common';
import { TaskService } from './../../services/task-service';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [NgStyle, RouterLink],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList {
  taskService = inject(TaskService);
  filter = signal<'all' | 'completed' | 'active'>('all');

  filteredTasks = computed(() => {
    switch (this.filter()) {
      case 'all':
        return this.taskService.tasks();
      case 'active':
        return this.taskService.acttiveTask();
      case 'completed':
        return this.taskService.completedTask();

      default:
        return this.taskService.tasks();
    }
  });

  setfilter(filter: 'all' | 'completed' | 'active') {
    this.filter.set(filter);
  }

  deleteTask(id: number) {
    return this.taskService.deleteTask(id);
  }
  changeTaskStatus(id: number) {
    return this.taskService.changeTaskStatus(id);
  }
}
