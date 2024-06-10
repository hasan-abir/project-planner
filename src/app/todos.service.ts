import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

export interface Plan {
  id: string;
  title: string;
  tasks: Task[];
}

export type ColorVariant = 1 | 2 | 3 | 4;

export interface Label {
  id: string;
  name: string;
  colorVariant: ColorVariant;
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
  private labelsSubject: BehaviorSubject<Label[]> = new BehaviorSubject<
    Label[]
  >([]);
  private plansSubject: BehaviorSubject<Plan[]> = new BehaviorSubject<Plan[]>(
    [],
  );
  public labels$: Observable<Label[]> = this.labelsSubject.asObservable();

  public plans$: Observable<Plan[]> = this.plansSubject.asObservable();

  constructor() {
    this.setPlans([
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

    this.setLabels([
      {
        id: uuidv4(),
        name: 'Priority 1',
        colorVariant: 4,
      },
      {
        id: uuidv4(),
        name: 'Priority 2',
        colorVariant: 3,
      },
      {
        id: uuidv4(),
        name: 'Priority 3',
        colorVariant: 2,
      },
      {
        id: uuidv4(),
        name: 'Priority 4',
        colorVariant: 1,
      },
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

  addNewLabel(name: string, colorVariant: ColorVariant) {
    const updatedLabels = this.getLabels();
    updatedLabels.push({ id: uuidv4(), name, colorVariant });

    this.setLabels(updatedLabels);
  }

  deleteLabel(id: string) {
    const updatedLabels = this.getLabels().filter((item) => item.id !== id);

    this.setLabels(updatedLabels);
  }

  setPlans(plans: Plan[]) {
    this.plansSubject.next(plans);
  }
  getPlans(): Plan[] {
    return this.plansSubject.value;
  }

  setLabels(label: Label[]) {
    this.labelsSubject.next(label);
  }
  getLabels(): Label[] {
    return this.labelsSubject.value;
  }
}
