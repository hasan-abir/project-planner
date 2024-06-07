import { TestBed } from '@angular/core/testing';

import { TodosService } from './todos.service';

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
    service.setPlans([
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ]);
    service.addANewPlan();
    expect(service.getPlans().length).toBe(3);
    expect(service.getPlans()[0].title).toBe('New plan');
    expect(service.getPlans()[0].tasks.length).toBe(0);
  });

  it('should delete a plan', () => {
    const plans = [
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    service.setPlans(plans);
    service.deletePlan(plans[1].id);
    expect(service.getPlans().length).toBe(1);
    expect(service.getPlans()[0].id).toBe(plans[0].id);
  });

  it('should add a new task to plan', () => {
    service.setPlans([
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ]);
    const newTask = {
      planId: '2',
      title: 'New task',
      description: 'Lorem',
    };

    service.addANewTaskToPlan(newTask);
    expect(service.getPlans()[1].tasks.length).toBe(1);
    expect(service.getPlans()[1].tasks[0].title).toBe(newTask.title);
    expect(service.getPlans()[1].tasks[0].description).toBe(
      newTask.description,
    );
  });

  it('should delete a task', () => {
    const plans = [
      {
        id: '1',
        title: 'Plan 1',
        tasks: [{ id: '1', title: 'Task 1', description: 'Lorem' }],
      },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    service.setPlans(plans);
    service.deleteTaskFromPlan(plans[0].id, plans[0].tasks[0].id);
    expect(service.getPlans()[0].tasks.length).toBe(0);
  });
});
