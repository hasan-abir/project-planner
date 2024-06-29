import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label, TodosService } from '../todos.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PillComponent } from '../utilities/pill/pill.component';

@Component({
  selector: 'app-label-group',
  standalone: true,
  imports: [CommonModule, PillComponent],
  templateUrl: './label-group.component.html',
  styleUrl: './label-group.component.css',
})
export class LabelGroupComponent implements OnInit {
  @Output() labelClicked: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() small: boolean = false;
  @Input() selectedLabels: string[] = [];
  labels$: Observable<Label[]> = of([]);

  constructor(private service: TodosService) {}

  onLabelClick(id: string) {
    this.addOrRemoveLabel(id);

    this.labelClicked.emit(this.selectedLabels);
  }

  addOrRemoveLabel(id: string) {
    if (this.selectedLabels.includes(id)) {
      this.selectedLabels = this.selectedLabels.filter((item) => item !== id);
    } else {
      this.selectedLabels.push(id);
    }
  }

  ngOnInit(): void {
    this.labels$ = this.service.labels$;
  }
}
