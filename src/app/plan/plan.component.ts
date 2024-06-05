import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CardComponent } from '../utilities/card/card.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';
import { CtaButtonComponent } from '../utilities/cta-button/cta-button.component';
import { PillComponent } from '../utilities/pill/pill.component';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { TaskComponent } from '../task/task.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Task } from '../app.component';
import { FormsModule } from '@angular/forms';
import { TodosService } from '../todos.service';

interface Label {
  id: string;
  name: string;
  priority: number;
}

export interface NewTaskValue {
  title: string;
  description: string;
  planId: string;
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
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    FormsModule,
  ],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
})
export class PlanComponent {
  @ViewChild('formRef') formRef?: ElementRef;
  @Input() planId: string = '';
  @Input() headerTitle: string = '';
  @Input() tasks: Task[] = [];
  @Output() addANewTask: EventEmitter<NewTaskValue> =
    new EventEmitter<NewTaskValue>();

  constructor(private service: TodosService) {}

  newTaskTitle: string = '';
  newTaskDescription: string = '';

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

  onSubmit() {
    if (this.newTaskTitle.length === 0) return;

    this.service.addANewTaskToPlan({
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      id: this.planId,
    });

    this.newTaskTitle = '';
    this.newTaskDescription = '';

    this.toggleAddTask();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
