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
