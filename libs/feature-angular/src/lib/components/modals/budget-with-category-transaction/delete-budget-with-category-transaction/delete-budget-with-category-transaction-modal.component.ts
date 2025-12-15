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
import {
  BudgetWithCategoryTransactionsService,
  DeleteBudgetWithCategoryTransactionService,
} from '../../../../services';
import { ModalLayoutComponent } from '../../../layouts';
import { DeleteBudgetWithCategoryTransactionInterface } from '../../../../models';

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
    public budgetWithCategoryTransactionData: DeleteBudgetWithCategoryTransactionInterface
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
          if (this.budgetWithCategoryTransactionData.type == 'budget') {
            this.budgetWithCategoryTransactionsService
              .findBudgetWithCategoryTransactionsByFilter({
                budgetId: this.budgetWithCategoryTransactionData.budgetId,
              })
              .subscribe();
            this.close();
          } else {
            this.budgetWithCategoryTransactionsService
              .findBudgetWithCategoryTransactionsByFilter({
                categoryTransactionId:
                  this.budgetWithCategoryTransactionData.categoryTransactionId,
              })
              .subscribe();
            this.close();
          }
        }
      });
  }
}
