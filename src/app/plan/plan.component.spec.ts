import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { Label, TodosService } from '../todos.service';

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
    titleInput.value = 'New task';
    const description = 'Lorem ipsum';
    descriptionInput.value = 'Lorem ipsum';

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

  it('should add or remove labels', () => {
    const labels: Label[] = [
      { id: '123', name: 'Label 1', colorVariant: 2 },
      { id: '321', name: 'Label 2', colorVariant: 3 },
      { id: '213', name: 'Label 3', colorVariant: 1 },
    ];
    service.setLabels(labels);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const pills = compiled.querySelectorAll('app-pill');

    expect(pills.length).toBe(3);
    pills[0].click();
    fixture.detectChanges();
    expect(component.selectedLabels.length).toBe(1);
    pills[0].click();
    fixture.detectChanges();
    expect(component.selectedLabels.length).toBe(0);
  });
});
