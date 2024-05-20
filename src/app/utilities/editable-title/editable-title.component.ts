import { NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-title',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './editable-title.component.html',
  styleUrl: './editable-title.component.css',
})
export class EditableTitleComponent implements AfterViewChecked {
  @ViewChild('textbox') textbox?: ElementRef;

  @Input() textClasses: string = '';
  @Input() textContent: string = '';
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

  ngAfterViewChecked() {
    if (this.shouldFocus && this.textbox) {
      this.textbox.nativeElement.focus();
      this.shouldFocus = false;
    }
  }
}
