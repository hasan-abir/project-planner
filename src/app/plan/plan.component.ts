import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CardComponent } from '../utilities/card/card.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';
import { CtaButtonComponent } from '../utilities/cta-button/cta-button.component';
import { PillComponent } from '../utilities/pill/pill.component';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { TaskComponent } from '../task/task.component';

interface Label {
  id: string;
  name: string;
  priority: number;
}

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    EditableTitleComponent,
    CtaButtonComponent,
    PillComponent,
    TaskComponent,
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
})
export class PlanComponent {
  @ViewChild('formRef') formRef?: ElementRef;
  @Input() headerTitle: string = '';

  addTaskOpened: boolean = false;
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

  toggleAddTask() {
    const defaultDuration = 0.25;
    if (this.formRef && this.addTaskOpened) {
      gsap.to(this.formRef.nativeElement, {
        height: 0,
        marginTop: 0,
        duration: defaultDuration,
      });
      this.addTaskOpened = false;
    } else if (this.formRef && !this.addTaskOpened) {
      gsap.to(this.formRef.nativeElement, {
        height: 'auto',
        marginTop: '0.75rem',
        duration: defaultDuration,
      });
      this.addTaskOpened = true;
    }
  }
}
