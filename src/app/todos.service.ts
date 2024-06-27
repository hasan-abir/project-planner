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
  labels: Label[];
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

    this.setPlans([
      {
        id: uuidv4(),
        title: 'Todo',
        tasks: [
          {
            id: uuidv4(),
            title: 'I just came',
            description: '',
            labels: [{ ...this.getLabels()[0] }],
          },
          {
            id: uuidv4(),
            title: 'Hey Mama',
            description:
              "I know I act a fool. If I had gone back to school, I wouldn't be no Ye",
            labels: [{ ...this.getLabels()[1] }, { ...this.getLabels()[2] }],
          },
          {
            id: uuidv4(),
            title: "Can't tell me",
            description: "I've always been this way. Can't tell me better",
            labels: [],
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

  editPlan(id: string, editData: { title: string }) {
    const updatedPlans = this.getPlans();
    const index = updatedPlans.findIndex((item) => item.id === id);

    updatedPlans[index].title = editData.title;

    this.setPlans(updatedPlans);
  }

  addANewTaskToPlan(taskData: {
    planId: string;
    title: string;
    description: string;
    labelIds: string[];
  }) {
    const updatedPlans = this.getPlans();
    const newTask: Task = {
      id: uuidv4(),
      title: taskData.title,
      description: taskData.description,
      labels: taskData.labelIds
        .filter((item) =>
          this.getLabels()
            .map((label) => label.id)
            .includes(item),
        )
        .map((item) => {
          const index = this.getLabels().findIndex(
            (label) => label.id === item,
          );
          return this.getLabels()[index];
        }),
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

  editTaskInPlan(
    planId: string,
    taskId: string,
    editData: { title?: string; description?: string; labelIds?: string[] },
  ) {
    const updatedPlans = this.getPlans();
    const planIndex = updatedPlans.findIndex((item) => item.id === planId);
    const currentPlan = updatedPlans[planIndex];
    const taskIndex = currentPlan.tasks.findIndex((item) => item.id === taskId);
    let tasks = currentPlan.tasks;

    if (editData.title) {
      tasks[taskIndex].title = editData.title;
      updatedPlans[planIndex] = {
        ...currentPlan,
        tasks,
      };
    }

    if (editData.description) {
      tasks[taskIndex].description = editData.description;
      updatedPlans[planIndex] = {
        ...currentPlan,
        tasks,
      };
    }

    if (editData.labelIds) {
      const newLabels: Label[] = [];

      editData.labelIds.forEach((id) => {
        const labelFound: Label | undefined = this.getLabels().find(
          (item) => item.id === id,
        );
        if (labelFound) {
          newLabels.push(labelFound);
        }
      });
      tasks[taskIndex].labels = newLabels;
      updatedPlans[planIndex] = {
        ...currentPlan,
        tasks,
      };
    }

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

    const updatedPlans = this.getPlans().map((plan) => {
      let tasks = plan.tasks;

      tasks = tasks.map((task) => {
        const updatedLabels = task.labels.filter((label) => label.id !== id);

        return { ...task, labels: updatedLabels };
      });

      return { ...plan, tasks };
    });

    this.setPlans(updatedPlans);
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
