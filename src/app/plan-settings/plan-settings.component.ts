import { Component } from '@angular/core';
import { CtaButtonComponent } from '../utilities/cta-button/cta-button.component';
import { PillComponent } from '../utilities/pill/pill.component';

@Component({
  selector: 'app-plan-settings',
  standalone: true,
  imports: [CtaButtonComponent, PillComponent],
  templateUrl: './plan-settings.component.html',
  styleUrl: './plan-settings.component.css',
})
export class PlanSettingsComponent {}