import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  CategoryTransactionResponseDto,
  DeleteBudgetWithCategoryTransactionDto,
  EditBudgetWithCategoryTransactionDto,
} from '@pure-workspace/domain';
import { BudgetWithCategoryTransactionsService } from '../../../../services';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DefaultButtonIconComponent } from '../../../buttons';
import {
  DefaultSearchBarControlsComponent,
  ListItemBudgetByCategoryTransactionControlsComponent,
} from '../../../controls';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatList } from '@angular/material/list';
import {
  DeleteBudgetWithCategoryTransactionModalComponent,
  EditBudgetByCategoryTransactionModalComponent,
} from '..';
@Component({
  selector: 'lib-list-budgets-by-category-transaction-modal',
  templateUrl: 'list-budgets-by-category-transaction-modal.component.html',
  styleUrl: 'list-budgets-by-category-transaction-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIcon,
    DefaultButtonIconComponent,
    DefaultSearchBarControlsComponent,
    MatPaginator,
    MatList,
    ListItemBudgetByCategoryTransactionControlsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBudgetsByCategoryTransactionModalComponent implements OnInit {
  private budgetWithCategoryTransactionsService = inject(
    BudgetWithCategoryTransactionsService
  );
  private dialogRef = inject(
    MatDialogRef<ListBudgetsByCategoryTransactionModalComponent>
  );
  private dialogService = inject(MatDialog);
  @Input() title = 'Orçamentos da categoria da transação';
  budgets = computed(
    () =>
      this.budgetWithCategoryTransactionsService.budgetWithCategoryTransactions()
        .items
  );
  @Input() length = computed(
    () =>
      this.budgetWithCategoryTransactionsService.budgetWithCategoryTransactions()
        .filteredTotal
  );
  @Input() pageSize = 6;
  @Input() pageIndex = 0;
  @Input() ariaLabel = 'Seletor de página';
  pageEvent: PageEvent = {} as PageEvent;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public categoryTransactionResponseDto: CategoryTransactionResponseDto
  ) {}

  close() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.budgetWithCategoryTransactionsService
      .findBudgetWithCategoryTransactionsByFilter({
        categoryTransactionId: this.categoryTransactionResponseDto.id,
      })
      .subscribe();
  }

  onCreate() {
    // this.dialogService.open(CreateBudgetWithTransactionByBudgetModalComponent, {
    //   data: this.budgetResponseDto,
    //   autoFocus: true,
    // });
    console.log('create');
  }

  onSearchChange(value: string) {
    this.budgetWithCategoryTransactionsService
      .findBudgetWithCategoryTransactionsByFilter({
        categoryTransactionId: this.categoryTransactionResponseDto.id,
        name: value,
      })
      .subscribe();
  }

  onDeleteRelationship(
    input: Pick<DeleteBudgetWithCategoryTransactionDto, 'budgetId'>
  ) {
    this.dialogService.open(DeleteBudgetWithCategoryTransactionModalComponent, {
      data: {
        budgetId: this.categoryTransactionResponseDto.id,
        categoryTransactionId: input.budgetId,
      },
    });
  }

  onEditRelationship(
    input: Pick<EditBudgetWithCategoryTransactionDto, 'budgetId'>
  ) {
    this.dialogService.open(EditBudgetByCategoryTransactionModalComponent, {
      data: {
        budgetId: input.budgetId,
        categoryTransactionId: this.categoryTransactionResponseDto.id,
      },
    });
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
    this.budgetWithCategoryTransactionsService
      .listBudgetWithCategoryTransactionsWithPaginated({ skip, take })
      .subscribe();
  }
}
