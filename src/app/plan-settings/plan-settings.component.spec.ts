import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSettingsComponent } from './plan-settings.component';
import { TodosService } from '../todos.service';

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
});
