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
    fixture.componentInstance.ngOnInit();
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
  it('should emit afterEdit', () => {
    spyOn(component.afterEdit, 'emit');

    const title = fixture.nativeElement.querySelector('h2');
    title.click();
    fixture.detectChanges();
    const titleInput = fixture.nativeElement.querySelector('#editable-text');
    const form = fixture.nativeElement.querySelector('form');
    const titleText = 'Example';
    titleInput.value = titleText;
    titleInput.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.afterEdit.emit).toHaveBeenCalledTimes(1);
    expect(component.textboxOpen).toBe(false);
  });
  it('should change the textbox into title', () => {
    component.textboxOpen = true;
    fixture.detectChanges();
    const textbox = fixture.debugElement.query(By.css('input'));

    textbox.triggerEventHandler('focusout', null);
    expect(component.textboxOpen).toBeFalse();
  });

  it('should render the title with the textContent (multitext)', () => {
    const textContent = 'Example';
    component.multitext = true;
    component.textContent = textContent;
    fixture.componentInstance.ngOnInit();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('p');
    expect(title.textContent).toEqual(` ${textContent} `);
  });
  it('should render the textbox (multitext)', () => {
    component.textboxOpen = true;
    component.multitext = true;
    fixture.detectChanges();

    const textbox = fixture.nativeElement.querySelector('textarea');

    expect(textbox).toBeTruthy();
  });
  it('should change the title into textbox (multitext)', () => {
    component.multitext = true;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('p');

    title.click();
    expect(component.textboxOpen).toBeTrue();
  });
  it('should emit afterEdit (multitext)', () => {
    spyOn(component.afterEdit, 'emit');
    component.multitext = true;
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('p');
    title.click();
    fixture.detectChanges();
    const titleInput = fixture.nativeElement.querySelector(
      '#editable-multitext',
    );
    const form = fixture.nativeElement.querySelector('form');
    const titleText = 'Example';
    titleInput.value = titleText;
    titleInput.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.afterEdit.emit).toHaveBeenCalledTimes(1);
    expect(component.textboxOpen).toBe(false);
  });
  it('should change the textbox into title (multitext)', () => {
    component.multitext = true;
    component.textboxOpen = true;
    fixture.detectChanges();
    const textbox = fixture.debugElement.query(By.css('textarea'));
    const closeTextbox = fixture.nativeElement.querySelector('#close-textarea');

    closeTextbox.click();
    expect(component.textboxOpen).toBeFalse();
  });
});
