import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatList } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SidenavItem } from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListItemTransactionHomeControlsComponent,
  ValueCardComponent,
  GraphCardComponent,
  FiltersDashboardControlsComponent,
} from '../../components';
import {
  TodayService,
  TotalTransactionsService,
  TransactionsService,
} from '../../services';
import {
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ɵInternalFormsSharedModule,
    FiltersDashboardControlsComponent,
  ],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DashboardContainerComponent implements OnInit {
  private transactionsService = inject(TransactionsService);
  private totalTransactionsService = inject(TotalTransactionsService);
  private todayService = inject(TodayService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  transactions = computed(
    () => this.transactionsService.transactions().transactions
  );

  totals = computed(() => {
    const totals = this.totalTransactionsService.totalTransactions();

    return totals.map((total, index) => ({
      ...total,
      title: this.brTitles[index],
    }));
  });
  brTitles = ['SALDO', 'DEPOSITOS', 'SAQUES'];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  ngOnInit(): void {
    this.transactionsService
      .findTransactionByFilter({
        initialDate: this.todayService.showTodayDate(),
        finalDate: this.todayService.getPlus30Days(),
      })
      .subscribe();
    this.totalTransactionsService
      .listTotalTransactions({
        initialDate: this.todayService.showTodayDate(),
        finalDate: this.todayService.getPlus30Days(),
      })
      .subscribe();
  }
}
