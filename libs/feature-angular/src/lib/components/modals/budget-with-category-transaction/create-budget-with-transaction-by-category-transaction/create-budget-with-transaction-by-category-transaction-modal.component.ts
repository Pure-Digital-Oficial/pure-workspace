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
  CreateBudgetWithCategoryTransactionDto,
  TransactionResponseItem,
} from '@pure-workspace/domain';
import {
  BudgetsService,
  BudgetWithCategoryTransactionsService,
  CreateBudgetWithCategoryTransactionService,
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
  selector: 'lib-create-budget-with-transaction-by-category-transaction-modal',
  templateUrl:
    'create-budget-with-transaction-by-category-transaction-modal.component.html',
  styleUrl:
    'create-budget-with-transaction-by-category-transaction-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ModalLayoutComponent,
  ],
})
export class CreateBudgetWithTransactionByCategoryTransactionModalComponent
  implements OnInit
{
  private budgetsService = inject(BudgetsService);
  private createBudgetWithCategoryTransactionService = inject(
    CreateBudgetWithCategoryTransactionService
  );
  private budgetWithCategoryTransactionsService = inject(
    BudgetWithCategoryTransactionsService
  );
  private snackbarService = inject(SnackbarStackService);
  form: FormGroup<BudgetWithCategoryTransactionForm>;
  budgets = computed<TransactionResponseItem[]>(() => this.ajustBudgets());
  private dialogRef = inject(
    MatDialogRef<CreateBudgetWithTransactionByCategoryTransactionModalComponent>
  );

  private ajustBudgets() {
    const budgets = this.budgetsService.budgets().budgets || [];

    const budgetWithCategory =
      this.budgetWithCategoryTransactionsService.budgetWithCategoryTransactions()
        .items || [];

    const idsByBudget = new Set(
      budgetWithCategory.map((item) => item.budget.id)
    );

    return budgets.filter((budget) => !idsByBudget.has(budget.id));
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public budgetWithCategoryTransactionData: Pick<
      CreateBudgetWithCategoryTransactionDto,
      'categoryTransactionId'
    >,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      budgetId: new FormControl('', [Validators.required, Validators.min(1)]),
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
      this.createBudgetWithCategoryTransactionService
        .create({
          budgetId: this.form.value.budgetId,
          categoryTransactionId: this.form.value.categoryTransactionId,
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
