import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pill.component.html',
  styleUrl: './pill.component.css',
})
export class PillComponent {
  @Input() clickable: boolean = false;
  @Input() colorVariant: number = 1;
  @Input() selected: boolean = false;
  @Input() small: boolean = false;
  @Input() close: boolean = false;
}
