import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillComponent } from './pill.component';

describe('PillComponent', () => {
  let component: PillComponent;
  let fixture: ComponentFixture<PillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PillComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have pointer cursor', () => {
    component.clickable = true;
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.cursor-pointer');

    expect(el).toBeTruthy();
  });
  it('should have a ring', () => {
    component.clickable = true;
    component.selected = true;
    fixture.detectChanges();

    const el = fixture.nativeElement.querySelector('.ring-2');

    expect(el).toBeTruthy();
  });
  it('should have display all the variants', () => {
    component.colorVariant = 1;
    fixture.detectChanges();

    const grayEl = fixture.nativeElement.querySelector('.bg-gray-500');

    expect(grayEl).toBeTruthy();

    component.colorVariant = 2;
    fixture.detectChanges();

    const blueEl = fixture.nativeElement.querySelector('.bg-blue-500');

    expect(blueEl).toBeTruthy();

    component.colorVariant = 3;
    fixture.detectChanges();

    const yellowEl = fixture.nativeElement.querySelector('.bg-amber-500');

    expect(yellowEl).toBeTruthy();

    component.colorVariant = 4;
    fixture.detectChanges();

    const redEl = fixture.nativeElement.querySelector('.bg-red-500');

    expect(redEl).toBeTruthy();
  });
});
