import { TestBed } from '@angular/core/testing';

import { Task, TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a new plan', () => {
    service.plans = [
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    service.addANewPlan();
    expect(service.plans.length).toBe(3);
    expect(service.plans[0].title).toBe('New plan');
    expect(service.plans[0].tasks.length).toBe(0);
  });

  it('should add a new task to plan', () => {
    service.plans = [
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    const newTask: Task = {
      id: '2',
      title: 'New task',
      description: 'Lorem',
    };

    service.addANewTaskToPlan(newTask);
    expect(service.plans[1].tasks.length).toBe(1);
    expect(service.plans[1].tasks[0].title).toBe(newTask.title);
    expect(service.plans[1].tasks[0].description).toBe(newTask.description);
  });
});
