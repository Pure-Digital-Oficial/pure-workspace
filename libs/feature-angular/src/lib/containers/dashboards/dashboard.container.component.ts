import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatList } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import {
  SidenavItem,
  TotalTransactionsResponseDto,
} from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListItemTransactionHomeControlsComponent,
  ValueCardComponent,
  GraphCardComponent,
} from '../../components';
import { TransactionsService } from '../../services';

@Component({
  selector: 'lib-dashboard-container',
  imports: [
    CommonModule,
    DefaultLayoutComponent,
    MatButtonModule,
    MatChipsModule,
    ListItemTransactionHomeControlsComponent,
    MatList,
    ValueCardComponent,
    GraphCardComponent,
  ],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
})
export class DashboardContainerComponent implements OnInit {
  private transactionsService = inject(TransactionsService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  transactions = computed(
    () => this.transactionsService.transactions().transactions
  );

  totals: TotalTransactionsResponseDto[] = [
    { title: 'Saldo', total: 1000 },
    { title: 'Depositos', total: 3000 },
    { title: 'Saques', total: 2000 },
  ];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  ngOnInit(): void {
    this.transactionsService.listTransactions().subscribe();
  }
}
