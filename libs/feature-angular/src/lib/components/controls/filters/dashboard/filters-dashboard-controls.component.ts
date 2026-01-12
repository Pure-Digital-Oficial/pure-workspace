import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardForm } from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';
import { MatButtonModule } from '@angular/material/button';
import { TodayService, TotalTransactionsService } from '../../../../services';

@Component({
  selector: 'lib-filters-dashboard-controls',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './filters-dashboard-controls.component.html',
  styleUrl: './filters-dashboard-controls.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class FiltersDashboardControlsComponent {
  private todayService = inject(TodayService);
  private totalTransactionsService = inject(TotalTransactionsService);
  form!: FormGroup<DashboardForm>;
  @Output() submitForm = new EventEmitter<void>();

  constructor() {
    this.form = new FormGroup({
      initialDate: new FormControl(this.todayService.showTodayDate(), [
        Validators.required,
      ]),
      finalDate: new FormControl(this.todayService.getPlus30Days(), [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const errors = getFormValidationErrors(this.form);

    if (errors.length === 0) {
      const value = this.form.value;
      this.totalTransactionsService
        .listTotalTransactions({
          initialDate: value.initialDate ?? '',
          finalDate: value.finalDate ?? '',
        })
        .subscribe();
    }
  }
}
