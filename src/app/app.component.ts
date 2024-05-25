import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { PlanSettingsComponent } from './plan-settings/plan-settings.component';

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
}
