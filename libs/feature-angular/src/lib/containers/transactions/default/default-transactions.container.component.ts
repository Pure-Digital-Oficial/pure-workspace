import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { SidenavItem, TransactionResponseDto } from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListItemTransactionControlsComponent,
  CreateTransactionModalComponent,
  ListLayoutComponent,
  EditTransactionModalComponent,
  DeleteTransactionModalComponent,
} from '../../../components';
import { AuthService, TransactionsService } from '../../../services';

@Component({
  selector: 'lib-default-transactions-container',
  imports: [
    MatListModule,
    MatDialogModule,
    MatPaginatorModule,
    DefaultLayoutComponent,
    ListItemTransactionControlsComponent,
    ListLayoutComponent,
  ],
  providers: [AuthService],
  templateUrl: './default-transactions.container.component.html',
  styleUrl: './default-transactions.container.component.scss',
})
export class DefaultTransactionsContainerComponent implements OnInit {
  private transactionsService = inject(TransactionsService);
  private dialogService = inject(MatDialog);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  pageIndex = 0;
  pageSize = 6;
  totalLength = computed(
    () => this.transactionsService.transactions().filteredTotal
  );
  pageEvent: PageEvent = {} as PageEvent;

  transactions = computed(
    () => this.transactionsService.transactions().transactions
  );

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  ngOnInit(): void {
    this.transactionsService.listTransactions().subscribe();
  }

  createTransactionAction() {
    this.dialogService.open(CreateTransactionModalComponent);
  }

  editTransactionAction(transaction: TransactionResponseDto) {
    this.dialogService.open(EditTransactionModalComponent, {
      data: transaction,
    });
  }

  deleteTransactionAction(
    transaction: Pick<TransactionResponseDto, 'id' | 'name'>
  ) {
    this.dialogService.open(DeleteTransactionModalComponent, {
      data: transaction,
    });
  }

  onSearchValueChange(value: string) {
    this.transactionsService
      .findTransactionByFilter({
        name: value,
      })
      .subscribe();
  }

  onPageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    const skip = e.pageIndex * e.pageSize;
    const take = e.pageSize;
    this.featchTransactions(skip, take);
  }

  private featchTransactions(skip: number, take: number) {
    this.transactionsService
      .listTransactionsWithPaginated({ skip, take })
      .subscribe();
  }
}
