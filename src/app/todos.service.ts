import { Injectable } from '@angular/core';
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
  constructor() {}

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

  addANewPlan() {
    this.plans.unshift({ id: uuidv4(), title: 'New plan', tasks: [] });
  }

  addANewTaskToPlan(task: Task) {
    const newTask: Task = {
      id: uuidv4(),
      title: task.title,
      description: task.description,
    };
    const index = this.plans.findIndex((item) => item.id === task.id);
    let currentPlan = this.plans[index];
    this.plans[index] = {
      ...currentPlan,
      tasks: [...currentPlan.tasks, newTask],
    };
  }
}
