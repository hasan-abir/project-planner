import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  Input,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CtaButtonComponent } from '../cta-button/cta-button.component';

@Component({
  selector: 'app-editable-title',
  standalone: true,
  imports: [NgClass, FormsModule, CtaButtonComponent],
  templateUrl: './editable-title.component.html',
  styleUrl: './editable-title.component.css',
})
export class EditableTitleComponent implements AfterViewChecked, OnInit {
  @ViewChild('textbox') textbox?: ElementRef;

  @Input() textClasses: string = '';
  @Input() textContent: string = '';
  @Input() multitext: boolean = false;
  @Output() afterEdit: EventEmitter<string> = new EventEmitter();
  initialText: string = '';
  shouldFocus: boolean = false;
  textboxOpen: boolean = false;

  toggleTextbox(state: boolean) {
    this.textboxOpen = state;

    if (state) {
      this.shouldFocus = true;
    }
  }

  textboxFocusout() {
    this.toggleTextbox(false);
  }

  onSubmit() {
    this.afterEdit.emit(this.textContent);
    this.initialText = this.textContent;
    this.textboxFocusout();
  }

  ngOnInit(): void {
    this.initialText = this.textContent;
  }

  ngAfterViewChecked() {
    if (this.shouldFocus && this.textbox) {
      this.textbox.nativeElement.focus();
      this.shouldFocus = false;
    }
  }
}
