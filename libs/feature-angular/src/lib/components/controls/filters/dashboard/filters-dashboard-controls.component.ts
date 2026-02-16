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
import { MatButtonModule } from '@angular/material/button';
import { DashboardForm } from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';
import {
  TodayService,
  TotalTransactionsService,
  TransactionsForGraphsService,
  TransactionsService,
} from '../../../../services';

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
  private transactionsService = inject(TransactionsService);
  private transactionsForGraphsService = inject(TransactionsForGraphsService);
  form!: FormGroup<DashboardForm>;
  @Output() submitForm = new EventEmitter<void>();

  constructor() {
    this.form = new FormGroup({
      initialDate: new FormControl(this.todayService.getLess30Days(), [
        Validators.required,
      ]),
      finalDate: new FormControl(this.todayService.showTodayDate(), [
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
      this.transactionsService
        .findTransactionByFilter({
          initialDate: value.initialDate ?? '',
          finalDate: value.finalDate ?? '',
        })
        .subscribe();
      this.transactionsForGraphsService
        .listTransactions({
          initialDate: value.initialDate ?? '',
          finalDate: value.finalDate ?? '',
        })
        .subscribe();
    }
  }
}
