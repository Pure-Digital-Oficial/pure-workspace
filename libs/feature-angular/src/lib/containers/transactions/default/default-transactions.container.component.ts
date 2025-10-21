import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SidenavItem } from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListItemTransactionControlsComponent,
  DefaultSearchBarControlsComponent,
  CreateTransactionModalComponent,
} from '../../../components';
import { AuthService, TransactionsService } from '../../../services';

@Component({
  selector: 'lib-default-transactions-container',
  imports: [
    MatListModule,
    MatDialogModule,
    DefaultLayoutComponent,
    ListItemTransactionControlsComponent,
    DefaultSearchBarControlsComponent,
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

  onSearchValueChange(value: string) {
    this.transactionsService
      .findTransactionByFilter({
        name: value,
      })
      .subscribe();
  }
}
