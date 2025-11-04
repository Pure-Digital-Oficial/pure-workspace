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
import { TransactionResponseDto } from '@pure-workspace/domain';
import {
  DeleteTransactionService,
  TransactionsService,
} from '../../../../../services';
import { ModalLayoutComponent } from '../../../../layouts';

@Component({
  selector: 'lib-delete-transaction-modal',
  templateUrl: 'delete-transaction-modal.component.html',
  styleUrl: 'delete-transaction-modal.component.scss',
  imports: [MatDialogModule, ModalLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteTransactionModalComponent {
  private dialogRef = inject(MatDialogRef<DeleteTransactionModalComponent>);
  private deleteTransactionService = inject(DeleteTransactionService);
  private transactionsService = inject(TransactionsService);
  @Input() title = 'Tem certeza que deseja excluir a transação';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public transactionData: Pick<TransactionResponseDto, 'id' | 'name'>
  ) {}

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.deleteTransactionService
      .delete({
        id: this.transactionData.id,
      })
      .subscribe((transaction) => {
        if (transaction) {
          this.transactionsService
            .listTransactions(transaction.transaction_id)
            .subscribe();
          this.close();
        }
      });
  }
}
