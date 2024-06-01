import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NewTaskValue, PlanComponent } from './plan/plan.component';
import { PlanSettingsComponent } from './plan-settings/plan-settings.component';
import { v4 as uuidv4 } from 'uuid';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PlanComponent,
    PlanSettingsComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project_planner';
  name = 'Hasan Abir';

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

  addANewTaskToPlan(event: NewTaskValue) {
    const newTask: Task = {
      id: uuidv4(),
      title: event.title,
      description: event.description,
    };
    const index = this.plans.findIndex((item) => item.id === event.planId);
    let currentPlan = this.plans[index];
    this.plans[index] = {
      ...currentPlan,
      tasks: [...currentPlan.tasks, newTask],
    };
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.plans, event.previousIndex, event.currentIndex);
  }
}
