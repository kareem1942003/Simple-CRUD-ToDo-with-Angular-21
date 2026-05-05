import { computed, effect, Injectable, signal } from '@angular/core';
export interface Task {
  id: number;
  title: string;
  descriptaion: string;
  completed: boolean;
  createdAt: Date;
  color: string;
}
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private loadTasks(): Task[] {
    const data = localStorage.getItem('tasks');
    if (!data) return [];
    return JSON.parse(data).map((task: Task) => ({
      ...task,

      createdAt: new Date(task.createdAt),
    }));
  }
  private tasksSignal = signal<Task[]>(
    //   [
    //   {
    //     id: 1,
    //     title: 'Laern Angular Basics',
    //     descriptaion: 'Understand components, services and routing',
    //     completed: true,
    //     createdAt: new Date('2026-04-29'),
    //     color: '#FF5733',
    //   },
    //   {
    //     id: 2,
    //     title: 'Build a project',
    //     descriptaion: 'Create a task manager application',
    //     completed: false,
    //     createdAt: new Date('2026-04-30'),
    //     color: '#821700',
    //   },
    //   {
    //     id: 3,
    //     title: 'Build a project',
    //     descriptaion: 'Create a user manager application',
    //     completed: false,
    //     createdAt: new Date('2026-03-30'),
    //     color: '#13107e',
    //   },
    // ]
    this.loadTasks(),
  );

  constructor() {
    effect(() => {
      const tasks = this.tasksSignal();
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
  }

  tasks = this.tasksSignal.asReadonly();

  acttiveTask = computed(() => {
    return this.tasksSignal().filter((task) => !task.completed);
  });
  completedTask = computed(() => {
    return this.tasksSignal().filter((task) => task.completed);
  });

  getTask(id: number) {
    return this.tasks().find((task) => task.id === id);
  }

  addTask(title: string, descriptaion: string) {
    const task: Task = {
      id: this.tasksSignal().length + 1,
      title,
      descriptaion,
      completed: false,
      createdAt: new Date(),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    };
    this.tasksSignal.update((tasks) => [task, ...tasks]);
  }
  deleteTask(id: number) {
    this.tasksSignal.update((tasks) => tasks.filter((task) => task.id !== id));
  }
  changeTaskStatus(id: number) {
    this.tasksSignal.update((tasks) =>
      tasks.map((t) => (t.id === id ? { ...t, completed: true } : t)),
    );
  }
}
