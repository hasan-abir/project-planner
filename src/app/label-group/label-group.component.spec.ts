import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelGroupComponent } from './label-group.component';
import { Label, TodosService } from '../todos.service';

describe('LabelGroupComponent', () => {
  let component: LabelGroupComponent;
  let fixture: ComponentFixture<LabelGroupComponent>;
  let service: TodosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabelGroupComponent);
    service = TestBed.inject(TodosService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add or remove labels', () => {
    spyOn(component.labelClicked, 'emit');
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
    component.onLabelClick(labels[0].id);
    expect(component.labelClicked.emit).toHaveBeenCalledTimes(1);
    expect(component.labelClicked.emit).toHaveBeenCalledWith([labels[0].id]);
    fixture.detectChanges();
    expect(component.selectedLabels.length).toBe(1);

    component.onLabelClick(labels[0].id);
    expect(component.labelClicked.emit).toHaveBeenCalledTimes(2);
    expect(component.labelClicked.emit).toHaveBeenCalledWith([]);
    fixture.detectChanges();
    expect(component.selectedLabels.length).toBe(0);
  });
});
