import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { getFormValidationErrors } from '../../../../utils';
import { TransactionForm } from '../../../../models';
import {
  CreateTransactionService,
  TransactionsService,
} from '../../../../services';
import { DefaultInputComponent } from '../../../inputs';
import { ModalLayoutComponent } from '../../../layouts';

@Component({
  selector: 'lib-create-transaction-modal',
  templateUrl: 'create-transaction-modal.component.html',
  styleUrl: 'create-transaction-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DefaultInputComponent,
    ModalLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionModalComponent {
  private createTransactionService = inject(CreateTransactionService);
  private transactionsService = inject(TransactionsService);
  private dialogRef = inject(MatDialogRef<CreateTransactionModalComponent>);
  form: FormGroup<TransactionForm>;
  categories = computed(() => [
    {
      id: '1',
      name: 'TEST',
    },
  ]);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      value: new FormControl('', [Validators.required, Validators.min(0.01)]),
      categoryId: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      type: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const errors = getFormValidationErrors(this.form);

    if (errors.length === 0) {
      this.createTransactionService
        .create({
          name: this.form.value.name,
          value: parseFloat(this.form.value.value),
          categoryId: this.form.value.categoryId,
          type: this.form.value.type,
        })
        .subscribe((transaction) => {
          if (transaction) {
            this.transactionsService
              .listTransactions(transaction.transaction_id)
              .subscribe();
            this.close();
          }
        });
    } else {
      // Colocar uma exibição melhor de erros depois
      console.log('Erros de validação:', errors);
    }
  }
}
