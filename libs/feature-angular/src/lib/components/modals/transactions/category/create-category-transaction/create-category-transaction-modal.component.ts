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
import { ModalLayoutComponent } from '../../../../layouts';
import { DefaultInputComponent } from '../../../../inputs';
import { CategoryTransactionForm } from '../../../../../models';
import {
  CreateCategoryTransactionService,
  SnackbarStackService,
} from '../../../../../services';
import { getFormValidationErrors } from '../../../../../utils';

@Component({
  selector: 'lib-create-category-transaction-modal',
  templateUrl: 'create-category-transaction-modal.component.html',
  styleUrl: 'create-category-transaction-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    DefaultInputComponent,
    ModalLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCategoryTransactionModalComponent {
  private dialogRef = inject(
    MatDialogRef<CreateCategoryTransactionModalComponent>
  );
  private snackbarService = inject(SnackbarStackService);
  private createCategoryTransactionService = inject(
    CreateCategoryTransactionService
  );
  form: FormGroup<CategoryTransactionForm>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
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
      this.createCategoryTransactionService
        .create({
          name: this.form.value.name,
          description: this.form.value.description,
        })
        .subscribe((transaction) => {
          if (transaction) {
            // this.transactionsService
            //   .listTransactions(transaction.transaction_id)
            //   .subscribe();
            this.snackbarService.show(
              'Categoria criada com sucesso',
              'success'
            );
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
