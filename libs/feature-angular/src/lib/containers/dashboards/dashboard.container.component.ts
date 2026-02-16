import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { MatList } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  ReactiveFormsModule,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SidenavItem } from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListItemTransactionHomeControlsComponent,
  ValueCardComponent,
  GraphCardComponent,
  FiltersDashboardControlsComponent,
  DefaultButtonIconComponent,
  CreateTransactionModalComponent,
} from '../../components';
import {
  TodayService,
  TotalTransactionsService,
  TransactionsForGraphsService,
  TransactionsService,
} from '../../services';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import {
  ChartConstructorType,
  HighchartsChartDirective,
} from 'highcharts-angular';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'lib-dashboard-container',
  imports: [
    CommonModule,
    MatButtonModule,
    MatChipsModule,
    MatList,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ɵInternalFormsSharedModule,
    MatMenuModule,
    DefaultButtonIconComponent,
    DefaultLayoutComponent,
    ValueCardComponent,
    GraphCardComponent,
    ListItemTransactionHomeControlsComponent,
    FiltersDashboardControlsComponent,
    MatIcon,
    HighchartsChartDirective,
    A11yModule,
  ],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DashboardContainerComponent implements OnInit {
  private transactionsService = inject(TransactionsService);
  private totalTransactionsService = inject(TotalTransactionsService);
  private transactionsForGraphsService = inject(TransactionsForGraphsService);
  private todayService = inject(TodayService);
  private dialogService = inject(MatDialog);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  transactions = computed(
    () => this.transactionsService.transactions().transactions
  );

  transactionsForGraphs = computed(() =>
    this.transactionsForGraphsService.transactions().map((transaction) => ({
      name: transaction.category,
      y: transaction.value,
    }))
  );

  totals = computed(() => {
    const totals = this.totalTransactionsService.totalTransactions();

    return totals.map((total, index) => ({
      ...total,
      title: this.brTitles[index],
    }));
  });
  brTitles = ['SALDO', 'DEPOSITOS', 'SAQUES'];
  chartOptions = computed<Highcharts.Options>(() => ({
    title: { text: '' },
    accessibility: { enabled: false },
    chart: { type: 'column' },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: { text: '' },
    },
    scrollbar: { enabled: true },
    series: [
      {
        name: 'Categorias',
        id: 'Categorias',
        type: 'column',
        data: this.transactionsForGraphs(),
      },
    ],
  }));
  chartConstructor: ChartConstructorType = 'chart';

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  ngOnInit(): void {
    this.transactionsService
      .findTransactionByFilter({
        initialDate: this.todayService.getLess30Days(),
        finalDate: this.todayService.showTodayDate(),
      })
      .subscribe();
    this.totalTransactionsService
      .listTotalTransactions({
        initialDate: this.todayService.getLess30Days(),
        finalDate: this.todayService.showTodayDate(),
      })
      .subscribe();
    this.transactionsForGraphsService
      .listTransactions({
        initialDate: this.todayService.getLess30Days(),
        finalDate: this.todayService.showTodayDate(),
      })
      .subscribe();
  }

  createTransactionAction() {
    this.dialogService.open(CreateTransactionModalComponent);
  }
}
