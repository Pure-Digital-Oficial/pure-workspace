import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
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
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  TransactionResponseDto,
  TransactionResponseItem,
} from '@pure-workspace/domain';
import { getFormValidationErrors } from '../../../../utils';
import { TransactionForm } from '../../../../models';
import { DefaultInputComponent } from '../../../inputs';
import { ModalLayoutComponent } from '../../../layouts';
import {
  EditTransactionService,
  TransactionsService,
} from '../../../../services';

@Component({
  selector: 'lib-edit-transaction-modal',
  templateUrl: 'edit-transaction-modal.component.html',
  styleUrl: 'edit-transaction-modal.component.scss',
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
export class EditTransactionModalComponent {
  private dialogRef = inject(MatDialogRef<EditTransactionModalComponent>);
  private editTransactionService = inject(EditTransactionService);
  private transactionsService = inject(TransactionsService);
  form: FormGroup<TransactionForm>;
  categories = computed<TransactionResponseItem[]>(() => [
    {
      id: '1',
      name: 'TEST',
    },
  ]);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public transactionData: TransactionResponseDto
  ) {
    this.form = this.fb.group({
      name: new FormControl(this.transactionData.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      value: new FormControl(this.transactionData.value, [
        Validators.required,
        Validators.min(0.01),
      ]),
      categoryId: new FormControl(this.transactionData.category.id, [
        Validators.required,
        Validators.minLength(1),
      ]),
      type: new FormControl(this.transactionData.type, [
        Validators.required,
        Validators.minLength(1),
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
      this.editTransactionService
        .edit({
          id: this.transactionData.id,
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
      console.log('Form Errors', errors);
    }
  }
}
