import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PlanSettingsComponent } from './plan-settings/plan-settings.component';
import { PlanComponent } from './plan/plan.component';
import { Plan, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    PlanComponent,
    PlanSettingsComponent,
    CdkDropList,
    CdkDrag,
    CdkDropListGroup,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'project_planner';
  name = 'Hasan Abir';
  plans$: Observable<Plan[]> = of([]);

  constructor(private service: TodosService) {}

  ngOnInit(): void {
    this.plans$ = this.service.plans$;
  }

  drop(event: CdkDragDrop<string[]>) {
    const plans = this.service.getPlans();
    moveItemInArray(plans, event.previousIndex, event.currentIndex);

    this.service.setPlans(plans);
  }
}
