import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  template: `
  <app-card>
    <p header>Card header 1</p>
    <p body>Card body 1</p>
    <p footer>Card footer 1</p>
  </app-card>
  `
})
class TestComponent {
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the card with fixed height', () => {
    component.fixedHeight = true
    fixture.detectChanges()

    const compiled = fixture.nativeElement

    const container = compiled.querySelector(".card-container");
    expect(container.classList.contains("min-h-[520px]")).toBeTrue();
  });
  it('should not render the card with fixed height', () => {
    component.fixedHeight = false
    fixture.detectChanges()

    const compiled = fixture.nativeElement

    const container = compiled.querySelector(".card-container");
    expect(container.classList.contains("min-h-[520px]")).toBeFalse();
  });

  it('should render provided header, body, and footer', () => {
    const compiled = TestBed.createComponent(TestComponent).nativeElement
    const headerContent = compiled.querySelector('[header]').textContent;
    const bodyContent = compiled.querySelector('[body]').textContent
    const footerContent = compiled.querySelector('[footer]').textContent

    expect(headerContent).toBe('Card header 1');
    expect(bodyContent).toBe('Card body 1');
    expect(footerContent).toBe('Card footer 1');
  });
});
