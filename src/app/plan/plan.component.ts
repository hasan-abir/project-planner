import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
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
import { FormsModule } from '@angular/forms';
import { Label, Task, TodosService } from '../todos.service';
import { Observable, of } from 'rxjs';

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
export class PlanComponent implements OnInit {
  @ViewChild('formRef') formRef?: ElementRef;
  @Input() planId: string = '';
  @Input() headerTitle: string = '';
  @Input() tasks: Task[] = [];
  @Output() addANewTask: EventEmitter<NewTaskValue> =
    new EventEmitter<NewTaskValue>();

  constructor(private service: TodosService) {}

  newTaskTitle: string = '';
  newTaskDescription: string = '';
  labels$: Observable<Label[]> = of([]);
  selectedLabels: string[] = [];

  addTaskOpened: boolean = false;

  ngOnInit(): void {
    this.labels$ = this.service.labels$;
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

  onSubmit() {
    if (this.newTaskTitle.length === 0) return;

    this.service.addANewTaskToPlan({
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      planId: this.planId,
      labelIds: this.selectedLabels,
    });

    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.selectedLabels = [];

    this.toggleAddTask();
  }

  onDelete() {
    this.service.deletePlan(this.planId);
  }

  onEdit(title: string) {
    this.service.editPlan(this.planId, { title });
  }

  addOrRemoveLabel(id: string) {
    if (this.selectedLabels.includes(id)) {
      this.selectedLabels = this.selectedLabels.filter((item) => item !== id);
    } else {
      this.selectedLabels.push(id);
    }
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
