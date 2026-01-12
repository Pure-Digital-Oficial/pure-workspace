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
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardForm } from '../../models';
import { getFormValidationErrors } from '../../utils';

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
  form!: FormGroup<DashboardForm>;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
    this.form = new FormGroup({
      initialDate: new FormControl('', [Validators.required]),
      finalDate: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit(): void {
    this.transactionsService.listTransactions().subscribe();
    this.totalTransactionsService
      .listTotalTransactions({
        finalDate: this.todayService.getPlus30Days(),
        initialDate: this.todayService.showTodayDate(),
      })
      .subscribe();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const errors = getFormValidationErrors(this.form);

    if (errors.length === 0) {
      console.log(
        this.form.value.finalDate + ' --- ' + this.form.value.initialDate
      );
    }
  }
}
