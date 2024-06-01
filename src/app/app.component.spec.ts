import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent, Plan } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and sub-title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Project Planner',
    );
    expect(compiled.querySelector('p')?.textContent).toContain(
      'Use this to keep track of tasks, or however way you want to use it',
    );
  });

  it('should display all the plans', () => {
    const plansArr: Plan[] = [
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    component.plans = plansArr;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const plans = compiled.querySelectorAll('app-plan');
    expect(plans.length).toBe(2);
    expect(plans[0].getAttribute('ng-reflect-header-title')).toBe(
      plansArr[0].title,
    );
    expect(plans[1].getAttribute('ng-reflect-header-title')).toBe(
      plansArr[1].title,
    );
  });
  it('should display the new plan', () => {
    const plansArr: Plan[] = [
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    component.plans = plansArr;
    fixture.detectChanges();
    component.addANewPlan();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const plans = compiled.querySelectorAll('app-plan');
    expect(plans.length).toBe(3);
    expect(plans[0].getAttribute('ng-reflect-header-title')).toBe('New plan');
    expect(plans[1].getAttribute('ng-reflect-header-title')).toBe(
      plansArr[1].title,
    );
    expect(plans[2].getAttribute('ng-reflect-header-title')).toBe(
      plansArr[2].title,
    );
  });

  it('should add the new task', () => {
    const plansArr: Plan[] = [
      { id: '1', title: 'Plan 1', tasks: [] },
      { id: '2', title: 'Plan 2', tasks: [] },
    ];
    component.plans = plansArr;
    fixture.detectChanges();
    const newTask = {
      planId: '2',
      title: 'New task',
      description: 'Lorem ipsum',
    };
    component.addANewTaskToPlan(newTask);
    fixture.detectChanges();

    expect(component.plans[1].tasks.length === 1).toBeTrue();
  });
});
