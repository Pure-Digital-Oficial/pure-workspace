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
  BudgetsService,
  BudgetWithCategoryTransactionsService,
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
  templateUrl: 'edit-budget-by-category-transaction-modal.component.html',
  styleUrl: 'edit-budget-by-category-transaction-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ModalLayoutComponent,
  ],
})
export class EditBudgetByCategoryTransactionModalComponent implements OnInit {
  private budgetsService = inject(BudgetsService);
  private editBudgetWithCategoryTransactionService = inject(
    EditBudgetWithCategoryTransactionService
  );
  private budgetWithCategoryTransactionsService = inject(
    BudgetWithCategoryTransactionsService
  );
  private snackbarService = inject(SnackbarStackService);
  form: FormGroup<BudgetWithCategoryTransactionForm>;
  budgets = computed<TransactionResponseItem[]>(() => this.ajustBudgets());
  private dialogRef = inject(
    MatDialogRef<EditBudgetByCategoryTransactionModalComponent>
  );

  private ajustBudgets() {
    const budgets = this.budgetsService.budgets().budgets || [];

    const budgetWithCategory =
      this.budgetWithCategoryTransactionsService.budgetWithCategoryTransactions()
        .items || [];

    const idsByBudget = new Set(
      budgetWithCategory.map((item) => item.budget.id)
    );

    idsByBudget.delete(this.budgetWithCategoryTransactionData.budgetId);

    return budgets.filter((budget) => !idsByBudget.has(budget.id));
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public budgetWithCategoryTransactionData: Pick<
      EditBudgetWithCategoryTransactionDto,
      'budgetId' | 'categoryTransactionId'
    >,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      budgetId: new FormControl(
        this.budgetWithCategoryTransactionData.budgetId,
        [Validators.required, Validators.min(1)]
      ),
      categoryTransactionId: [
        this.budgetWithCategoryTransactionData.categoryTransactionId,
      ],
    });
  }

  ngOnInit(): void {
    this.budgetsService.listBudgets().subscribe();
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
          budgetId: this.budgetWithCategoryTransactionData.budgetId,
          categoryTransactionId: this.form.value.categoryTransactionId,
          newBudgetId: this.form.value.budgetId,
        })
        .subscribe(() => {
          this.budgetWithCategoryTransactionsService
            .findBudgetWithCategoryTransactionsByFilter({
              categoryTransactionId:
                this.budgetWithCategoryTransactionData.categoryTransactionId,
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
