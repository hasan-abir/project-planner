import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.css',
})
export class PillComponent {
  @Input() colorVariant: number = 1;
  @Input() selected: boolean = false;
  @Input() small: boolean = false;
  @Input() close: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleted: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  onPillClick() {
    this.clicked.emit();
  }

  onCloseClick() {
    this.deleted.emit();
  }
}
