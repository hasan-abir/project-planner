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
import { Label, Plan, TodosService } from './todos.service';

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
  loadingData: boolean = true;

  constructor(private service: TodosService) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const storedPlans: Plan[] = JSON.parse(
        localStorage.getItem('plansArr') || '[]',
      );
      const storedLabels: Label[] = JSON.parse(
        localStorage.getItem('labelsArr') || '[]',
      );

      if (storedLabels.length > 0) {
        this.service.setLabels(storedLabels);
      } else {
        this.service.setDummyLabels();
      }

      this.plans$ = this.service.plans$;

      if (storedPlans.length > 0) {
        this.service.setPlans(storedPlans);
      } else {
        this.service.setDummyPlans();
      }

      this.loadingData = false;

      this.service.labels$.subscribe((updatedLabels) => {
        localStorage.setItem('labelsArr', JSON.stringify(updatedLabels));
      });
      this.service.plans$.subscribe((updatedPlans) => {
        localStorage.setItem('plansArr', JSON.stringify(updatedPlans));
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    const plans = this.service.getPlans();
    moveItemInArray(plans, event.previousIndex, event.currentIndex);

    this.service.setPlans(plans);
  }
}
