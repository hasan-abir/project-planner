import { Component, Input, OnInit } from '@angular/core';
import { PillComponent } from '../utilities/pill/pill.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Label, TodosService } from '../todos.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CtaButtonComponent } from '../utilities/cta-button/cta-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    PillComponent,
    EditableTitleComponent,
    CtaButtonComponent,
    CdkDrag,
    CdkDragHandle,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  @Input() taskId: string = '';
  @Input() planId: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() globalLabels$: Observable<Label[]> = of([]);
  @Input() selectedLabels: string[] = [];
  @Input() labels: Label[] = [];
  editLabels: boolean = false;

  constructor(private service: TodosService) {}

  toggleEditLabels(state: boolean) {
    this.editLabels = state;
  }

  onDelete() {
    this.service.deleteTaskFromPlan(this.planId, this.taskId);
  }

  onEditLabels() {
    this.service.editTaskInPlan(this.planId, this.taskId, {
      labelIds: this.selectedLabels,
    });
    this.toggleEditLabels(false);
  }

  onEditTitle(title: string) {
    this.service.editTaskInPlan(this.planId, this.taskId, { title });
  }

  onEditDescription(description: string) {
    this.description = description;
    this.service.editTaskInPlan(this.planId, this.taskId, { description });
  }

  addOrRemoveLabel(id: string) {
    if (this.selectedLabels.includes(id)) {
      this.selectedLabels = this.selectedLabels.filter((item) => item !== id);
    } else {
      this.selectedLabels.push(id);
    }
  }

  ngOnInit() {
    this.globalLabels$ = this.service.labels$;
    let labelIds: string[] = this.labels.map((item) => item.id);

    this.selectedLabels = labelIds;
  }
}
