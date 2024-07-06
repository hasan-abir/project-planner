import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modalBg') modalBg?: ElementRef;
  @ViewChild('modalBody') modalBody?: ElementRef;
  @Output() closeClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(private renderer: Renderer2) {
    this.handleKeyInput = this.handleKeyInput.bind(this);
  }

  onBgClick() {
    this.closeClicked.emit();
  }

  handleKeyInput(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.onBgClick();
    }
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'overflow-hidden');
    this.renderer.addClass(document.body, 'fixed');
    this.renderer.addClass(document.body, 'w-full');

    document.addEventListener('keydown', this.handleKeyInput);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'overflow-hidden');
    this.renderer.removeClass(document.body, 'fixed');
    this.renderer.removeClass(document.body, 'w-full');

    document.removeEventListener('keydown', this.handleKeyInput);
  }

  ngAfterViewInit(): void {
    if (this.modalBg && this.modalBody) {
      gsap
        .timeline({ defaults: { duration: 0.3 } })
        .to(this.modalBg.nativeElement, {
          opacity: 0.5,
        })
        .to(
          this.modalBody.nativeElement,
          {
            y: 0,
            opacity: 1,
            onComplete: () => {
              this.modalBody?.nativeElement.focus();
            },
          },
          '<-0.15',
        );
    }
  }
}
