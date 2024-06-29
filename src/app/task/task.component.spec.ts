import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { Label, TodosService } from '../todos.service';
import { By } from '@angular/platform-browser';

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

  it('should display provided title, description, and labels', () => {
    const title = 'Task 1';
    const description = 'Lorem ipsum';
    component.title = title;
    component.description = description;
    component.labels = [
      {
        id: '123',
        name: 'Priority 1',
        colorVariant: 4,
      },
      {
        id: '321',
        name: 'Priority 2',
        colorVariant: 3,
      },
    ];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const titleEl = compiled.querySelectorAll('app-editable-title')[0];
    const descriptionEl = compiled.querySelectorAll('app-editable-title')[1];
    const pills = compiled.querySelectorAll('app-pill');
    expect(titleEl.getAttribute('ng-reflect-text-content')).toBe(title);
    expect(descriptionEl.getAttribute('ng-reflect-text-content')).toBe(
      description,
    );
    expect(pills.length).toBe(2);
  });
  it('should emit editTaskInPlan() with title', () => {
    const planId = '123';
    const taskId = '321';
    const title = 'Example';
    component.planId = planId;
    component.taskId = taskId;
    fixture.detectChanges();
    spyOn(service, 'editTaskInPlan');

    component.onEditTitle(title);
    fixture.detectChanges();

    expect(service.editTaskInPlan).toHaveBeenCalledTimes(1);
    expect(service.editTaskInPlan).toHaveBeenCalledWith(planId, taskId, {
      title,
    });
  });
  it('should emit editTaskInPlan() with description', () => {
    const planId = '123';
    const taskId = '321';
    const description = 'Example';
    component.planId = planId;
    component.taskId = taskId;
    fixture.detectChanges();
    spyOn(service, 'editTaskInPlan');

    component.onEditDescription(description);
    fixture.detectChanges();

    expect(service.editTaskInPlan).toHaveBeenCalledTimes(1);
    expect(service.editTaskInPlan).toHaveBeenCalledWith(planId, taskId, {
      description,
    });
    expect(component.description).toBe(description);
  });
  it('should add a sample description when there are not any', () => {
    const addDescriptionBtn = fixture.debugElement.query(
      By.css('#add-description'),
    );
    addDescriptionBtn.nativeElement.click();
    fixture.detectChanges();
    expect(component.description.length > 0).toBeTrue();
  });
  it('should open edit label menu', () => {
    const labelsGroup = fixture.debugElement.query(By.css('#labels-group'));
    let editLabels = fixture.debugElement.query(By.css('app-label-group'));

    expect(editLabels).toBeNull();
    labelsGroup.nativeElement.click();
    fixture.detectChanges();
    editLabels = fixture.debugElement.query(By.css('app-label-group'));

    expect(editLabels).toBeTruthy();
  });
  it('should open edit label menu when there are not any', () => {
    const addLabelsBtn = fixture.debugElement.query(By.css('#add-labels'));
    let editLabels = fixture.debugElement.query(By.css('app-label-group'));

    expect(editLabels).toBeNull();
    addLabelsBtn.nativeElement.click();
    fixture.detectChanges();
    editLabels = fixture.debugElement.query(By.css('app-label-group'));

    expect(editLabels).toBeTruthy();
  });
  it('should close edit label menu', () => {
    const labelsGroup = fixture.debugElement.query(By.css('#labels-group'));
    labelsGroup.nativeElement.click();
    fixture.detectChanges();
    let editLabels = fixture.debugElement.query(By.css('app-label-group'));

    expect(editLabels).toBeTruthy();

    component.toggleEditLabels(false);
    fixture.detectChanges();
    editLabels = fixture.debugElement.query(By.css('app-label-group'));

    expect(editLabels).toBeFalsy();
  });
  it('should set selectedLabels', () => {
    const labels: string[] = ['123', '213', '321'];

    component.setSelectedLabels(labels);
    fixture.detectChanges();
    expect(component.selectedLabels).toBe(labels);
  });
  it('should emit editTaskInPlan', () => {
    spyOn(service, 'editTaskInPlan');
    component.editLabels = true;
    const taskId = '123';
    component.taskId = taskId;
    const planId = '231';
    component.planId = planId;
    const selectedLabels: string[] = ['123', '321'];
    component.selectedLabels = selectedLabels;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const form = compiled.querySelector('#edit-labels-form');

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(service.editTaskInPlan).toHaveBeenCalledTimes(1);
    expect(service.editTaskInPlan).toHaveBeenCalledWith(planId, taskId, {
      labelIds: selectedLabels,
    });
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
