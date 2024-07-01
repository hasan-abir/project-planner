import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { Label, Plan, TodosService } from '../todos.service';
import { By } from '@angular/platform-browser';

describe('PlanComponent', () => {
  let component: PlanComponent;
  let fixture: ComponentFixture<PlanComponent>;
  let service: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanComponent);
    service = TestBed.inject(TodosService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the visibility of form', () => {
    const compiled = fixture.nativeElement;
    const form = compiled.querySelector('form');
    const button = compiled.querySelector('#toggle-add-task-btn');
    button.click();
    fixture.detectChanges();
    setTimeout(() => {
      expect(form.style.height).toBe('auto');

      button.click();
      fixture.detectChanges();

      setTimeout(() => {
        expect(form.style.height).toBe('0');
      }, 500);
    }, 500);
  });

  it('should emit addANewTask with parameters on form submit', () => {
    spyOn(service, 'addANewTaskToPlan');

    const planId = '123';
    component.planId = planId;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const titleInput = compiled.querySelector('#task-title');
    const descriptionInput = compiled.querySelector('#task-description');
    const form = compiled.querySelector('form');
    const title = 'New task';
    titleInput.value = title;
    const description = 'Lorem ipsum';
    descriptionInput.value = description;

    titleInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(service.addANewTaskToPlan).toHaveBeenCalledTimes(1);
    expect(service.addANewTaskToPlan).toHaveBeenCalledWith({
      planId,
      title,
      description,
      labelIds: [],
    });
  });

  it('should not emit addANewTask on form submit with incomplete form', () => {
    spyOn(component.addANewTask, 'emit');

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const form = compiled.querySelector('form');

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.addANewTask.emit).toHaveBeenCalledTimes(0);
  });
  it('should emit editPlan()', () => {
    const planId = '123';
    const title = 'Example';
    component.planId = planId;
    fixture.detectChanges();
    spyOn(service, 'editPlan');

    component.onEdit(title);
    expect(service.editPlan).toHaveBeenCalledTimes(1);
    expect(service.editPlan).toHaveBeenCalledWith(planId, { title });
  });
  it('should emit deletePlan()', () => {
    const planId = '123';
    component.planId = planId;
    fixture.detectChanges();
    spyOn(service, 'deletePlan');

    const compiled = fixture.nativeElement;
    const btn = compiled.querySelector('#delete-plan-btn');

    btn.click();

    expect(service.deletePlan).toHaveBeenCalledTimes(1);
    expect(service.deletePlan).toHaveBeenCalledWith(planId);
  });

  it('should set selectedLabels', () => {
    const labels: string[] = ['123', '231', '321'];
    component.setSelectedLabels(labels);
    fixture.detectChanges();
    expect(component.selectedLabels).toBe(labels);
  });
});
