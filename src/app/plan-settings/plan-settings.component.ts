import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ColorVariant, Label, TodosService } from '../todos.service';
import { CtaButtonComponent } from '../utilities/cta-button/cta-button.component';
import { PillComponent } from '../utilities/pill/pill.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plan-settings',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent, PillComponent, FormsModule],
  templateUrl: './plan-settings.component.html',
  styleUrl: './plan-settings.component.css',
})
export class PlanSettingsComponent implements OnInit {
  labelName: string = '';
  colorVariant: ColorVariant = 4;
  labels$: Observable<Label[]> = of([]);

  constructor(private service: TodosService) {}

  ngOnInit(): void {
    this.labels$ = this.service.labels$;
  }

  onAddPlanClick() {
    this.service.addANewPlan();
  }
  onAddLabelSubmit() {
    if (this.labelName === '') return;

    this.service.addNewLabel(this.labelName, this.colorVariant);

    this.labelName = '';
  }

  onDeleteLabel(id: string) {
    this.service.deleteLabel(id);
  }

  changeColorVariant(variant: ColorVariant) {
    this.colorVariant = variant;
  }
}
