import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  Input,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DeleteBudgetWithCategoryTransactionDto } from '@pure-workspace/domain';
import {
  BudgetWithCategoryTransactionsService,
  DeleteBudgetWithCategoryTransactionService,
} from '../../../../services';
import { ModalLayoutComponent } from '../../../layouts';

@Component({
  selector: 'lib-delete-budget-with-category-transaction-modal',
  templateUrl: 'delete-budget-with-category-transaction-modal.component.html',
  styleUrl: 'delete-budget-with-category-transaction-modal.component.scss',
  imports: [MatDialogModule, ModalLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteBudgetWithCategoryTransactionModalComponent {
  private dialogRef = inject(
    MatDialogRef<DeleteBudgetWithCategoryTransactionModalComponent>
  );
  private deleteBudgetWithCategoryTransactionService = inject(
    DeleteBudgetWithCategoryTransactionService
  );
  private budgetWithCategoryTransactionsService = inject(
    BudgetWithCategoryTransactionsService
  );
  @Input() title =
    'Tem certeza que deseja excluir a relação de orçamento com a transação de categoria';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public budgetWithCategoryTransactionData: Pick<
      DeleteBudgetWithCategoryTransactionDto,
      'budgetId' | 'categoryTransactionId'
    >
  ) {}

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.deleteBudgetWithCategoryTransactionService
      .delete({
        budgetId: this.budgetWithCategoryTransactionData.budgetId,
        categoryTransactionId:
          this.budgetWithCategoryTransactionData.categoryTransactionId,
      })
      .subscribe((budgetWithCategoryTransaction) => {
        if (budgetWithCategoryTransaction) {
          this.budgetWithCategoryTransactionsService
            .listBudgetWithCategoryTransactions(
              budgetWithCategoryTransaction.budget_with_category_id
            )
            .subscribe();
          this.close();
        }
      });
  }
}
