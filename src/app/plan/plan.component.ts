import { Component, Input } from '@angular/core';
import { CardComponent } from '../utilities/card/card.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';
import { CtaButtonComponent } from '../utilities/cta-button/cta-button.component';
import { PillComponent } from '../utilities/pill/pill.component';

interface Label {
  id: string;
  name: string;
  priority: number;
}

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    CardComponent,
    EditableTitleComponent,
    CtaButtonComponent,
    PillComponent,
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
})
export class PlanComponent {
  @Input() headerTitle: string = '';

  selectedLabels: string[] = [];
  labels: Label[] = [
    {
      id: '1',
      name: 'Priority 4',
      priority: 4,
    },
    {
      id: '2',
      name: 'Priority 3',
      priority: 3,
    },
    {
      id: '3',
      name: 'Priority 2',
      priority: 2,
    },
    {
      id: '4',
      name: 'Priority 1',
      priority: 1,
    },
  ];

  onSelectLabel(id: string) {
    if (this.selectedLabels.includes(id)) {
      this.selectedLabels = this.selectedLabels.filter((item) => item !== id);
    } else {
      this.selectedLabels = [id, ...this.selectedLabels];
    }
  }
}
