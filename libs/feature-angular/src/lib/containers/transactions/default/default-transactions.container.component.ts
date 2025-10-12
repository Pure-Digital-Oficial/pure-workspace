import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidenavItem, TransactionResponseDto } from '@pure-workspace/domain';
import { MatListModule } from '@angular/material/list';
import {
  DefaultLayoutComponent,
  ListItemTransactionControlsComponent,
} from '../../../components';
import { AuthService } from '../../../services';

@Component({
  selector: 'lib-default-transactions-container',
  imports: [
    MatListModule,
    DefaultLayoutComponent,
    ListItemTransactionControlsComponent,
  ],
  providers: [AuthService],
  templateUrl: './default-transactions.container.component.html',
  styleUrl: './default-transactions.container.component.scss',
})
export class DefaultTransactionsContainerComponent {
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  transactions: TransactionResponseDto[] = [
    {
      id: '1',
      category: 'categoria aa',
      createdAt: new Date(),
      createdBy: 'Erick',
      name: 'Contas mensais',
      status: 'ACTIVE',
      type: 'DEPOSIT',
      updatedAt: new Date(),
      value: 12,
    },
    {
      id: '2',
      category: 'categoria aa1',
      createdAt: new Date(),
      createdBy: 'Erick 2',
      name: 'Contas mensais 2',
      status: 'ACTIVE',
      type: 'WITHDRAW',
      updatedAt: new Date(),
      value: 12,
    },
  ];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }
}
