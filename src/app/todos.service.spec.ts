import { TestBed } from '@angular/core/testing';

import { ColorVariant, Label, Plan, TodosService } from './todos.service';

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

  it('should edit a plan', () => {
    const plans: Plan[] = [
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    service.setPlans(plans);
    const title = 'Example';
    service.editPlan(plans[1].id, { title });
    expect(service.getPlans()[1].title).toBe(title);
  });

  it('should delete a plan', () => {
    const plans: Plan[] = [
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
    service.setLabels([
      { id: '1', name: 'Label 1', colorVariant: 2 },
      { id: '2', name: 'Label 2', colorVariant: 1 },
    ]);
    const newTask = {
      planId: '2',
      title: 'New task',
      description: 'Lorem',
      labelIds: ['1'],
    };

    service.addANewTaskToPlan(newTask);
    expect(service.getPlans()[1].tasks.length).toBe(1);
    expect(service.getPlans()[1].tasks[0].title).toBe(newTask.title);
    expect(service.getPlans()[1].tasks[0].description).toBe(
      newTask.description,
    );
    expect(service.getPlans()[1].tasks[0].labels.length).toBe(1);
    expect(service.getPlans()[1].tasks[0].labels[0].id).toBe('1');
  });

  it('should edit a task', () => {
    const plans: Plan[] = [
      {
        id: '1',
        title: 'Plan 1',
        tasks: [{ id: '1', title: 'Task 1', description: 'Lorem', labels: [] }],
      },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    const title = 'Example';
    const description = 'Lorem';
    service.setPlans(plans);
    service.editTaskInPlan(plans[0].id, plans[0].tasks[0].id, {
      title,
      description,
    });
    expect(service.getPlans()[0].tasks[0].title).toBe(title);
    expect(service.getPlans()[0].tasks[0].description).toBe(description);
  });

  it('should delete a task', () => {
    const plans: Plan[] = [
      {
        id: '1',
        title: 'Plan 1',
        tasks: [{ id: '1', title: 'Task 1', description: 'Lorem', labels: [] }],
      },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    service.setPlans(plans);
    service.deleteTaskFromPlan(plans[0].id, plans[0].tasks[0].id);
    expect(service.getPlans()[0].tasks.length).toBe(0);
  });

  it('should add a label', () => {
    const labels: Label[] = [
      {
        id: '1',
        name: 'Label 1',
        colorVariant: 1,
      },
      {
        id: '2',
        name: 'Label 2',
        colorVariant: 3,
      },
    ];

    const newLabel: { name: string; colorVariant: ColorVariant } = {
      name: 'Label 3',
      colorVariant: 4,
    };

    service.setLabels(labels);
    service.addNewLabel(newLabel.name, newLabel.colorVariant);
    expect(service.getLabels().length).toBe(3);
    expect(service.getLabels()[2].name).toBe(newLabel.name);
  });

  it('should delete a label', () => {
    const labels: Label[] = [
      {
        id: '1',
        name: 'Label 1',
        colorVariant: 1,
      },
      {
        id: '2',
        name: 'Label 2',
        colorVariant: 3,
      },
    ];
    const plans: Plan[] = [
      {
        id: '1',
        title: 'Plan 1',
        tasks: [
          {
            id: '1',
            title: 'Task 1',
            description: '',
            labels: [{ ...labels[0] }],
          },
        ],
      },
    ];

    service.setLabels(labels);
    service.setPlans(plans);
    expect(service.getPlans()[0].tasks[0].labels.length).toBe(1);
    service.deleteLabel(labels[0].id);
    expect(service.getPlans()[0].tasks[0].labels.length).toBe(0);
    expect(service.getLabels().length).toBe(1);
    expect(service.getLabels()[0].name).toBe(labels[1].name);
  });
});
