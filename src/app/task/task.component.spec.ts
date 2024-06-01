import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display provided title and description', () => {
    const title = 'Task 1';
    const description = 'Lorem ipsum';
    component.title = title;
    component.description = description;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const titleEl = compiled.querySelectorAll('app-editable-title')[0];
    const descriptionEl = compiled.querySelectorAll('app-editable-title')[1];
    expect(titleEl.getAttribute('ng-reflect-text-content')).toBe(title);
    expect(descriptionEl.getAttribute('ng-reflect-text-content')).toBe(
      description,
    );
  });
});
