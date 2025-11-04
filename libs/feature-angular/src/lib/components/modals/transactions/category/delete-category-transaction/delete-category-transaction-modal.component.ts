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
import { CategoryTransactionResponseDto } from '@pure-workspace/domain';
import {
  CategoryTransactionsService,
  DeleteCategoryTransactionService,
} from '../../../../../services';
import { ModalLayoutComponent } from '../../../../layouts';

@Component({
  selector: 'lib-delete-category-transaction-modal',
  templateUrl: 'delete-category-transaction-modal.component.html',
  styleUrl: 'delete-category-transaction-modal.component.scss',
  imports: [MatDialogModule, ModalLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteCategoryTransactionModalComponent {
  private dialogRef = inject(
    MatDialogRef<DeleteCategoryTransactionModalComponent>
  );
  private deleteCategoryTransactionService = inject(
    DeleteCategoryTransactionService
  );
  private categoryTransactionsService = inject(CategoryTransactionsService);
  @Input() title = 'Tem certeza que deseja excluir a categoria da transação';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public categoryTransactionData: Pick<
      CategoryTransactionResponseDto,
      'id' | 'name'
    >
  ) {}

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.deleteCategoryTransactionService
      .delete({
        id: this.categoryTransactionData.id,
      })
      .subscribe((categoryTransaction) => {
        if (categoryTransaction) {
          this.categoryTransactionsService
            .listCategoryTransactions(
              categoryTransaction.category_transaction_id
            )
            .subscribe();
          this.close();
        }
      });
  }
}
