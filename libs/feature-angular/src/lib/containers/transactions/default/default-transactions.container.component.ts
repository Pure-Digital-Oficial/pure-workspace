import { Component, computed, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';
import { MatListModule } from '@angular/material/list';
import {
  DefaultLayoutComponent,
  ListItemTransactionControlsComponent,
  DefaultSearchBarControlsComponent,
} from '../../../components';
import { AuthService, TransactionService } from '../../../services';

@Component({
  selector: 'lib-default-transactions-container',
  imports: [
    MatListModule,
    DefaultLayoutComponent,
    ListItemTransactionControlsComponent,
    DefaultSearchBarControlsComponent,
  ],
  providers: [AuthService],
  templateUrl: './default-transactions.container.component.html',
  styleUrl: './default-transactions.container.component.scss',
})
export class DefaultTransactionsContainerComponent {
  private transactionService = inject(TransactionService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  transactions = computed(
    () => this.transactionService.transactions().transactions
  );

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });

    this.transactionService.listTransactions().subscribe();
  }

  action() {
    console.log('clicou');
  }

  onSearchValueChange(value: string) {
    console.log('Valor digitado:', value);
  }
}
