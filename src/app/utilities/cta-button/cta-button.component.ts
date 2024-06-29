import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './cta-button.component.html',
  styleUrl: './cta-button.component.css',
})
export class CtaButtonComponent {
  @Input() primary: boolean = true;
  @Input() small: boolean = false;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  onClick() {
    this.clicked.emit();
  }
}
