import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSettingsComponent } from './plan-settings.component';

describe('PlanSettingsComponent', () => {
  let component: PlanSettingsComponent;
  let fixture: ComponentFixture<PlanSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit addANewPlan on button click', () => {
    spyOn(component.addANewPlan, 'emit');

    const compiled = fixture.nativeElement;
    compiled.querySelector('#add-plan-btn').click();
    expect(component.addANewPlan.emit).toHaveBeenCalledTimes(1);
  });
});
