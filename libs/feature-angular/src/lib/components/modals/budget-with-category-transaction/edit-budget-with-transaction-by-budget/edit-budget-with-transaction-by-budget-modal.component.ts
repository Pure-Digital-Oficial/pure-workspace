import { Component, computed, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  EditBudgetWithCategoryTransactionDto,
  TransactionResponseItem,
} from '@pure-workspace/domain';
import {
  BudgetWithCategoryTransactionsService,
  CategoryTransactionsService,
  EditBudgetWithCategoryTransactionService,
  SnackbarStackService,
} from '../../../../services';
import { ModalLayoutComponent } from '../../../layouts';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BudgetWithCategoryTransactionForm } from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';

@Component({
  selector: 'lib-edit-budget-with-transaction-by-budget-modal',
  templateUrl: 'edit-budget-with-transaction-by-budget-modal.component.html',
  styleUrl: 'edit-budget-with-transaction-by-budget-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ModalLayoutComponent,
  ],
})
export class EditBudgetWithTransactionByBudgetModalComponent implements OnInit {
  private categoryTransactionsService = inject(CategoryTransactionsService);
  private editBudgetWithCategoryTransactionService = inject(
    EditBudgetWithCategoryTransactionService
  );
  private budgetWithCategoryTransactionsService = inject(
    BudgetWithCategoryTransactionsService
  );
  private snackbarService = inject(SnackbarStackService);
  form: FormGroup<BudgetWithCategoryTransactionForm>;
  categories = computed<TransactionResponseItem[]>(() => {
    const categories =
      this.categoryTransactionsService.categoryTransactions().categories || [];

    const categoriesByBudget =
      this.budgetWithCategoryTransactionsService.budgetWithCategoryTransactions()
        .items || [];

    const idsByBudget = new Set(
      categoriesByBudget.map((item) => item.categoryTransaction.id)
    );

    return categories.filter((category) => !idsByBudget.has(category.id));
  });
  private dialogRef = inject(
    MatDialogRef<EditBudgetWithTransactionByBudgetModalComponent>
  );

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public budgetWithCategoryTransactionData: Pick<
      EditBudgetWithCategoryTransactionDto,
      'budgetId' | 'categoryTransactionId'
    >,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      budgetId: [this.budgetWithCategoryTransactionData.budgetId],
      categoryTransactionId: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
    });
  }

  ngOnInit(): void {
    this.categoryTransactionsService.listCategoryTransactions().subscribe();
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const errors = getFormValidationErrors(this.form);
    if (errors.length === 0) {
      this.editBudgetWithCategoryTransactionService
        .edit({
          budgetId: this.form.value.budgetId,
          categoryTransactionId:
            this.budgetWithCategoryTransactionData.categoryTransactionId,
          newCategoryTransactionId: this.form.value.categoryTransactionId,
        })
        .subscribe(() => {
          this.budgetWithCategoryTransactionsService
            .findBudgetWithCategoryTransactionsByFilter({
              budgetId: this.budgetWithCategoryTransactionData.budgetId,
            })
            .subscribe();
          this.dialogRef.close(true);
        });
    } else {
      for (const error of errors) {
        this.snackbarService.show(error, 'warning');
      }
    }
  }
}
