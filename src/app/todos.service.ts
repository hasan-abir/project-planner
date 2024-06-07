import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Plan {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  private plansSubject: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>(
    [],
  );
  public plans$: Observable<Plan[]> = this.plansSubject.asObservable();
  plans: Plan[] = [
    {
      id: uuidv4(),
      title: 'Todo',
      tasks: [
        { id: uuidv4(), title: 'I just came', description: 'Do you trust me?' },
        {
          id: uuidv4(),
          title: 'Hey Mama',
          description:
            "I know I act a fool. If I had gone back to school, I wouldn't be no Ye",
        },
        {
          id: uuidv4(),
          title: "Can't tell me",
          description: "I've always been this way. Can't tell me better",
        },
      ],
    },
    { id: uuidv4(), title: 'In Progress', tasks: [] },
    { id: uuidv4(), title: 'Done', tasks: [] },
    { id: uuidv4(), title: 'Later', tasks: [] },
  ];

  constructor() {
    this.plansSubject.next([
      {
        id: uuidv4(),
        title: 'Todo',
        tasks: [
          {
            id: uuidv4(),
            title: 'I just came',
            description: 'Do you trust me?',
          },
          {
            id: uuidv4(),
            title: 'Hey Mama',
            description:
              "I know I act a fool. If I had gone back to school, I wouldn't be no Ye",
          },
          {
            id: uuidv4(),
            title: "Can't tell me",
            description: "I've always been this way. Can't tell me better",
          },
        ],
      },
      { id: uuidv4(), title: 'In Progress', tasks: [] },
      { id: uuidv4(), title: 'Done', tasks: [] },
      { id: uuidv4(), title: 'Later', tasks: [] },
    ]);
  }

  addANewPlan() {
    const updatedPlans = this.getPlans();
    updatedPlans.unshift({ id: uuidv4(), title: 'New plan', tasks: [] });
    this.setPlans(updatedPlans);
  }

  deletePlan(id: string) {
    const updatedPlans = this.getPlans().filter((item) => item.id !== id);
    this.setPlans(updatedPlans);
  }

  addANewTaskToPlan(taskData: {
    planId: string;
    title: string;
    description: string;
  }) {
    const updatedPlans = this.getPlans();
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
    };
    const index = updatedPlans.findIndex((item) => item.id === taskData.planId);
    let currentPlan = updatedPlans[index];
    updatedPlans[index] = {
      ...currentPlan,
      tasks: [...currentPlan.tasks, newTask],
    };

    this.setPlans(updatedPlans);
  }
  deleteTaskFromPlan(planId: string, taskId: string) {
    const updatedPlans = this.getPlans();
    const index = updatedPlans.findIndex((item) => item.id === planId);
    let currentPlan = updatedPlans[index];

    updatedPlans[index] = {
      ...currentPlan,
      tasks: currentPlan.tasks.filter((item) => item.id !== taskId),
    };

    this.setPlans(updatedPlans);
  }
  setPlans(plans: Plan[]) {
    this.plansSubject.next(plans);
  }
  getPlans(): Plan[] {
    return this.plansSubject.value;
  }
}
