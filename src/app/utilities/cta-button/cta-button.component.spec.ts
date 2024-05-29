import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaButtonComponent } from './cta-button.component';
import { Component } from '@angular/core';

@Component({
  imports: [CtaButtonComponent],
  template: `
    <app-cta-button>
      <p class="para">Button</p>
    </app-cta-button>
  `,
})
class TestComponent {}

describe('CtaButtonComponent', () => {
  let component: CtaButtonComponent;
  let fixture: ComponentFixture<CtaButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CtaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    const primaryBtn = fixture.nativeElement.querySelector('.bg-green-500');
    expect(primaryBtn).toBeFalsy();
  });

  it('should render primary', () => {
    component.primary = true;
    fixture.detectChanges();

    const primaryBtn = fixture.nativeElement.querySelector('.bg-green-300');
    expect(primaryBtn).toBeTruthy();
  });
  it('should render it small', () => {
    component.small = true;
    fixture.detectChanges();

    const smallBtn = fixture.nativeElement.querySelector('.text-xs');
    expect(smallBtn).toBeTruthy();
  });
  it('should render ng-content', () => {
    const compiled = TestBed.createComponent(TestComponent).nativeElement;
    const textContent = compiled.querySelector('.para').textContent;

    expect(textContent).toBe('Button');
  });
});
