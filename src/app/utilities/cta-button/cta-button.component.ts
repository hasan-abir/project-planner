import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

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
}