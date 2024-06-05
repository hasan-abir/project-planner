import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanComponent } from './plan.component';
import { TodosService } from '../todos.service';

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
      id: planId,
      title,
      description,
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
});
