import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit closeClicked', () => {
    spyOn(component.closeClicked, 'emit');

    const modalBg = fixture.nativeElement.querySelector('#modal-bg');
    modalBg.click();

    expect(component.closeClicked.emit).toHaveBeenCalledTimes(1);
  });
  it('should emit closeClicked on esc', () => {
    spyOn(component.closeClicked, 'emit');

    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);

    expect(component.closeClicked.emit).toHaveBeenCalledTimes(1);
  });
});
