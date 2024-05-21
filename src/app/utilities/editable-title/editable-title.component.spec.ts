import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTitleComponent } from './editable-title.component';
import { By } from '@angular/platform-browser';

describe('EditableTitleComponent', () => {
  let component: EditableTitleComponent;
  let fixture: ComponentFixture<EditableTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditableTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the title with the textContent', () => {
    const textContent = 'Example';
    component.textContent = textContent;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('h2');
    expect(title.textContent).toEqual(` ${textContent} `);
  });
  it('should render the textbox', () => {
    component.textboxOpen = true;
    fixture.detectChanges();

    const textbox = fixture.nativeElement.querySelector('input');

    expect(textbox).toBeTruthy();
  });
  it('should change the title into textbox', () => {
    const title = fixture.nativeElement.querySelector('h2');

    title.click();
    expect(component.textboxOpen).toBeTrue();
  });
  it('should change the textbox into title', () => {
    component.textboxOpen = true;
    fixture.detectChanges();
    const textbox = fixture.debugElement.query(By.css('input'));

    textbox.triggerEventHandler('focusout', null);
    expect(component.textboxOpen).toBeFalse();
  });
});
