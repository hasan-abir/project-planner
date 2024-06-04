import { Component, Input } from '@angular/core';
import { PillComponent } from '../utilities/pill/pill.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [PillComponent, EditableTitleComponent, CdkDrag, CdkDragHandle],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() title: string = '';
  @Input() description: string = '';
}
