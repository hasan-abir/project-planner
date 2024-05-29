import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { PlanSettingsComponent } from './plan-settings/plan-settings.component';
import { v4 as uuidv4 } from 'uuid';

interface Plan {
  id: string;
  title: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PlanComponent, PlanSettingsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'project_planner';
  name = 'Hasan Abir';

  plans: Plan[] = [
    { id: uuidv4(), title: 'Todo' },
    { id: uuidv4(), title: 'In Progress' },
    { id: uuidv4(), title: 'Done' },
    { id: uuidv4(), title: 'Later' },
  ];

  addANewPlan() {
    this.plans.unshift({ id: uuidv4(), title: 'New plan' });
  }
}
