import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSettingsComponent } from './plan-settings.component';
import { Label, TodosService } from '../todos.service';

describe('PlanSettingsComponent', () => {
  let component: PlanSettingsComponent;
  let fixture: ComponentFixture<PlanSettingsComponent>;
  let service: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanSettingsComponent);
    service = TestBed.inject(TodosService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call the service addANewPlan on button click', () => {
    spyOn(service, 'addANewPlan');

    const compiled = fixture.nativeElement;
    compiled.querySelector('#add-plan-btn').click();
    expect(service.addANewPlan).toHaveBeenCalledTimes(1);
  });
  it('should call the service addNewLabel on form submit', () => {
    spyOn(service, 'addNewLabel');
    const compiled = fixture.nativeElement;
    compiled.querySelector('#add-plan-btn').click();
    const nameInput = compiled.querySelector('#label-name');
    const form = compiled.querySelector('form');

    const name = 'Task';
    nameInput.value = name;
    nameInput.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(service.addNewLabel).toHaveBeenCalledTimes(1);
    expect(service.addNewLabel).toHaveBeenCalledWith(name, 4);
  });
  it('should not call the service addNewLabel with empty input', () => {
    spyOn(service, 'addNewLabel');
    const compiled = fixture.nativeElement;
    compiled.querySelector('#add-plan-btn').click();
    const nameInput = compiled.querySelector('#label-name');
    const form = compiled.querySelector('form');

    const name = '';
    nameInput.value = name;
    nameInput.dispatchEvent(new Event('input'));

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(service.addNewLabel).toHaveBeenCalledTimes(0);
  });

  it('should list labels and call the service deleteLabel', () => {
    const labels: Label[] = [
      {
        id: '123',
        name: 'Label 1',
        colorVariant: 3,
      },
      {
        id: '321',
        name: 'Label 2',
        colorVariant: 2,
      },
    ];
    spyOn(service, 'deleteLabel');
    service.setLabels(labels);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const pills = compiled.querySelectorAll('app-pill');

    expect(pills.length).toBe(labels.length);
    component.onDeleteLabel(labels[1].id);
    fixture.detectChanges();

    expect(service.deleteLabel).toHaveBeenCalledTimes(1);
    expect(service.deleteLabel).toHaveBeenCalledWith(labels[1].id);
  });
  it('should change colorVariant', () => {
    const compiled = fixture.nativeElement;
    const variant1 = compiled.querySelector('#colorvariant-1');
    const variant2 = compiled.querySelector('#colorvariant-2');
    const variant3 = compiled.querySelector('#colorvariant-3');
    const variant4 = compiled.querySelector('#colorvariant-4');

    variant1.click();
    fixture.detectChanges();
    expect(variant1.classList.contains('ring-2')).toBeTrue();
    expect(variant2.classList.contains('ring-2')).toBeFalse();
    expect(variant3.classList.contains('ring-2')).toBeFalse();
    expect(variant4.classList.contains('ring-2')).toBeFalse();

    variant2.click();
    fixture.detectChanges();
    expect(variant2.classList.contains('ring-2')).toBeTrue();
    expect(variant1.classList.contains('ring-2')).toBeFalse();
    expect(variant3.classList.contains('ring-2')).toBeFalse();
    expect(variant4.classList.contains('ring-2')).toBeFalse();

    variant3.click();
    fixture.detectChanges();
    expect(variant3.classList.contains('ring-2')).toBeTrue();
    expect(variant2.classList.contains('ring-2')).toBeFalse();
    expect(variant1.classList.contains('ring-2')).toBeFalse();
    expect(variant4.classList.contains('ring-2')).toBeFalse();

    variant4.click();
    fixture.detectChanges();
    expect(variant4.classList.contains('ring-2')).toBeTrue();
    expect(variant2.classList.contains('ring-2')).toBeFalse();
    expect(variant3.classList.contains('ring-2')).toBeFalse();
    expect(variant1.classList.contains('ring-2')).toBeFalse();
  });
});
