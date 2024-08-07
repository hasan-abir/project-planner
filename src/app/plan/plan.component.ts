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
import { LabelGroupComponent } from '../label-group/label-group.component';
import { ModalComponent } from '../modal/modal.component';

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
    LabelGroupComponent,
    PillComponent,
    TaskComponent,
    ModalComponent,
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
  confirmDelete: boolean = false;

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

  setSelectedLabels(labels: string[]) {
    this.selectedLabels = labels;
  }

  toggleConfirmDelete(state: boolean) {
    this.confirmDelete = state;
  }

  drop(event: CdkDragDrop<Task[]>) {
    const plans = this.service.getPlans();
    const planIndex = plans.findIndex((item) => item.id === this.planId);

    if (event.previousContainer === event.container) {
      moveItemInArray(
        plans[planIndex].tasks,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        plans[planIndex].tasks,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.service.setPlans(plans);
  }
}
