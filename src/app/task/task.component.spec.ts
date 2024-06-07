import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { TodosService } from '../todos.service';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let service: TodosService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskComponent],
    }).compileComponents();

    service = TestBed.inject(TodosService);
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
  it('should emit deleteATaskFromPlan()', () => {
    const planId = '123';
    const taskId = '321';
    component.planId = planId;
    component.taskId = taskId;
    fixture.detectChanges();
    spyOn(service, 'deleteTaskFromPlan');

    const compiled = fixture.nativeElement;
    const btn = compiled.querySelector('#delete-task-btn');

    btn.click();

    expect(service.deleteTaskFromPlan).toHaveBeenCalledTimes(1);
    expect(service.deleteTaskFromPlan).toHaveBeenCalledWith(planId, taskId);
  });
});
