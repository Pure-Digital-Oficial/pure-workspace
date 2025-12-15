import { Component, computed, inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import {
  CategoryTransactionResponseDto,
  SidenavItem,
} from '@pure-workspace/domain';
import {
  CreateCategoryTransactionModalComponent,
  DefaultLayoutComponent,
  ListLayoutComponent,
  ListItemCategoryTransactionControlsComponent,
  EditCategoryTransactionModalComponent,
  DeleteCategoryTransactionModalComponent,
  ListBudgetsByCategoryTransactionModalComponent,
} from '../../../components';
import { AuthService, CategoryTransactionsService } from '../../../services';

@Component({
  selector: 'lib-category-transactions-container',
  imports: [
    MatDialogModule,
    DefaultLayoutComponent,
    ListLayoutComponent,
    ListItemCategoryTransactionControlsComponent,
  ],
  providers: [AuthService],
  templateUrl: './category-transactions.container.component.html',
  styleUrl: './category-transactions.container.component.scss',
})
export class CategoryTransactionsContainerComponent implements OnInit {
  private dialogService = inject(MatDialog);
  private categoryTransactionsService = inject(CategoryTransactionsService);
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];
  pageIndex = 0;
  pageSize = 6;
  pageEvent: PageEvent = {} as PageEvent;

  totalLength = computed(
    () => this.categoryTransactionsService.categoryTransactions().filteredTotal
  );

  categoryTransactions = computed(
    () => this.categoryTransactionsService.categoryTransactions().categories
  );

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }

  ngOnInit(): void {
    this.categoryTransactionsService.listCategoryTransactions().subscribe();
  }

  createCategoryTransactionAction() {
    this.dialogService.open(CreateCategoryTransactionModalComponent);
  }

  editCategoryTransactionAction(
    categoryTransaction: CategoryTransactionResponseDto
  ) {
    this.dialogService.open(EditCategoryTransactionModalComponent, {
      data: categoryTransaction,
    });
  }

  deleteCategoryTransactionAction(
    categoryTransaction: Pick<CategoryTransactionResponseDto, 'id' | 'name'>
  ) {
    this.dialogService.open(DeleteCategoryTransactionModalComponent, {
      data: categoryTransaction,
    });
  }

  listBudgets(categoryTransaction: CategoryTransactionResponseDto) {
    this.dialogService.open(ListBudgetsByCategoryTransactionModalComponent, {
      data: categoryTransaction,
      panelClass: 'list-budgets',
    });
  }

  onSearchValueChange(value: string) {
    this.categoryTransactionsService
      .findCategoryTransactionByFilter({
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
    this.featchCategoryTransactions(skip, take);
  }

  private featchCategoryTransactions(skip: number, take: number) {
    this.categoryTransactionsService
      .listCategoryTransactionsWithPaginated({ skip, take })
      .subscribe();
  }
}
