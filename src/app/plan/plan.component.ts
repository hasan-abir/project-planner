import { Component, Input } from '@angular/core';
import { CardComponent } from '../utilities/card/card.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CardComponent, EditableTitleComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
})
export class PlanComponent {
  @Input() headerTitle: string = '';
}
