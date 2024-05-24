import { Component } from '@angular/core';
import { PillComponent } from '../utilities/pill/pill.component';
import { EditableTitleComponent } from '../utilities/editable-title/editable-title.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [PillComponent, EditableTitleComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {}
