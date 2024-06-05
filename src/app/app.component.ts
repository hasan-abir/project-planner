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
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { Plan, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PlanComponent,
    PlanSettingsComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project_planner';
  name = 'Hasan Abir';

  constructor(private service: TodosService) {}

  plans: Plan[] = this.service.plans;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      this.service.plans,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
