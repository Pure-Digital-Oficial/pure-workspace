import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryTransactionResponseDto } from '@pure-workspace/domain';
import { ModalLayoutComponent } from '../../../../layouts';
import { DefaultInputComponent } from '../../../../inputs';
import { CategoryTransactionForm } from '../../../../../models';
import {
  CategoryTransactionsService,
  EditCategoryTransactionService,
  SnackbarStackService,
} from '../../../../../services';
import { getFormValidationErrors } from '../../../../../utils';

@Component({
  selector: 'lib-edit-category-transaction-modal',
  templateUrl: 'edit-category-transaction-modal.component.html',
  styleUrl: 'edit-category-transaction-modal.component.scss',
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
export class EditCategoryTransactionModalComponent {
  private dialogRef = inject(
    MatDialogRef<EditCategoryTransactionModalComponent>
  );
  private snackbarService = inject(SnackbarStackService);
  private editCategoryTransactionService = inject(
    EditCategoryTransactionService
  );
  private categoryTransactionsService = inject(CategoryTransactionsService);
  form: FormGroup<CategoryTransactionForm>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public categoryTransactionData: CategoryTransactionResponseDto
  ) {
    this.form = this.fb.group({
      name: new FormControl(this.categoryTransactionData.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      description: new FormControl(this.categoryTransactionData.description, [
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
      this.editCategoryTransactionService
        .edit({
          id: this.categoryTransactionData.id,
          name: this.form.value.name,
          description: this.form.value.description,
        })
        .subscribe((categoryTransaction) => {
          if (categoryTransaction) {
            this.categoryTransactionsService
              .listCategoryTransactions(categoryTransaction.transaction_id)
              .subscribe();
            this.snackbarService.show(
              'Categoria editada com sucesso',
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
