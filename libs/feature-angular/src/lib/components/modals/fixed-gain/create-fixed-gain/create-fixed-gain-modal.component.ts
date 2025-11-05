import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalLayoutComponent } from '../../../layouts';
import {
  CreateFixedGainService,
  SnackbarStackService,
} from '../../../../services';
import { FixedGainForm, FixedGainFrequency } from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';
import { DefaultInputComponent } from '../../../inputs';

@Component({
  selector: 'lib-create-fixed-gain-modal',
  templateUrl: 'create-fixed-gain-modal.component.html',
  styleUrl: 'create-fixed-gain-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    ModalLayoutComponent,
    DefaultInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFixedGainModalComponent {
  private dialogRef = inject(MatDialogRef<CreateFixedGainModalComponent>);
  private snackbarService = inject(SnackbarStackService);
  private createFixedGainService = inject(CreateFixedGainService);
  // private categoryTransactionsService = inject(CategoryTransactionsService);
  form: FormGroup<FixedGainForm>;
  frequencies: FixedGainFrequency[] = [
    {
      id: 'YEARLY',
      title: 'ANUAL',
    },
    {
      id: 'DAILY',
      title: 'DIÁRIO',
    },
    {
      id: 'BIWEEKLY',
      title: 'QUINZENAL',
    },
    {
      id: 'MONTHLY',
      title: 'MENSAL',
    },
    {
      id: 'WEEKLY',
      title: 'SEMANALMENTE',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      dayOfReceipt: new FormControl<number>(0, [
        Validators.required,
        Validators.min(1),
        Validators.max(31),
      ]),
      frequency: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      value: new FormControl<number>(0, [
        Validators.required,
        Validators.min(0.01),
      ]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const errors = getFormValidationErrors(this.form);

    if (errors.length === 0) {
      const value = this.form.value;
      this.createFixedGainService
        .create({
          name: value.name,
          value: parseFloat(value.value),
          dayOfReceipt: parseFloat(value.dayOfReceipt),
          frequency: value.frequency,
        })
        .subscribe((fixedPain) => {
          if (fixedPain) {
            // this.transactionsService
            //   .listTransactions(transaction.transaction_id)
            //   .subscribe();
            this.close();
          }
        });
    } else {
      for (const error of errors) {
        this.snackbarService.show(error, 'warning');
      }
    }
  }
}
