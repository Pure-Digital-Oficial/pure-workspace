import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { BudgetResponseDto, SidenavItem } from '@pure-workspace/domain';
import {
  DefaultLayoutComponent,
  ListLayoutComponent,
  CreateBudgetModalComponent,
  ListItemBudgetControlsComponent,
  EditBudgetModalComponent,
  DeleteBudgetModalComponent,
  ListCategoryTransactionsByBudgetModalComponent,
} from '../../../components';
import { AuthService, BudgetsService } from '../../../services';

@Component({
  selector: 'lib-category-transactions-container',
  imports: [
    MatDialogModule,
    DefaultLayoutComponent,
    ListLayoutComponent,
    ListItemBudgetControlsComponent,
  ],
  providers: [AuthService],
  templateUrl: './default-budget.container.component.html',
  styleUrl: './default-budget.container.component.scss',
})
export class DefaultBudgetContainerComponent implements OnInit {
  private dialogService = inject(MatDialog);
  private budgetsService = inject(BudgetsService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  pageIndex = 0;
  pageSize = 6;
  pageEvent: PageEvent = {} as PageEvent;

  totalLength = computed(() => this.budgetsService.budgets().filteredTotal);

  budgets = computed(() => this.budgetsService.budgets().budgets);

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  ngOnInit(): void {
    this.budgetsService.listBudgets().subscribe();
  }

  createFixedGainAction() {
    this.dialogService.open(CreateBudgetModalComponent);
  }

  editFixedGainAction(budgetResponseDto: BudgetResponseDto) {
    this.dialogService.open(EditBudgetModalComponent, {
      data: budgetResponseDto,
    });
  }

  deleteFixedGainAction(
    budgetResponseDto: Pick<BudgetResponseDto, 'id' | 'name'>
  ) {
    this.dialogService.open(DeleteBudgetModalComponent, {
      data: budgetResponseDto,
    });
  }

  listCategoryTransactions(budgetResponseDto: BudgetResponseDto) {
    this.dialogService.open(ListCategoryTransactionsByBudgetModalComponent, {
      data: budgetResponseDto,
      panelClass: 'list-category-transactions',
    });
  }

  onSearchValueChange(value: string) {
    this.budgetsService
      .findBudgetsByFilter({
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
    this.featchBudgets(skip, take);
  }

  private featchBudgets(skip: number, take: number) {
    this.budgetsService.listBudgetsWithPaginated({ skip, take }).subscribe();
  }
}
