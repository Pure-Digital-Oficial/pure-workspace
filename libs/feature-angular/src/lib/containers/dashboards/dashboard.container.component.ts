import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListItemTransactionHomeControlsComponent,
} from '../../components';
import { TransactionsService } from '../../services';
import { MatList } from '@angular/material/list';

@Component({
  selector: 'lib-dashboard-container',
  imports: [
    CommonModule,
    DefaultLayoutComponent,
    MatButtonModule,
    ListItemTransactionHomeControlsComponent,
    MatList,
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
