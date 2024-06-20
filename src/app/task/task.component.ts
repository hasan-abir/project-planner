import { Component, Input } from '@angular/core';
import { PillComponent } from '../utilities/pill/pill.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Label, TodosService } from '../todos.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [PillComponent, EditableTitleComponent, CdkDrag, CdkDragHandle],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() taskId: string = '';
  @Input() planId: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() labels: Label[] = [];

  constructor(private service: TodosService) {}

  onDelete() {
    this.service.deleteTaskFromPlan(this.planId, this.taskId);
  }

  onEditTitle(title: string) {
    this.service.editTaskInPlan(this.planId, this.taskId, { title });
  }

  onEditDescription(description: string) {
    this.service.editTaskInPlan(this.planId, this.taskId, { description });
  }
}
