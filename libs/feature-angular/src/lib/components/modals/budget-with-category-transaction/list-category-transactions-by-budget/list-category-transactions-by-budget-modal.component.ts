import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BudgetWithCategoryTransactionsService } from '../../../../services';
import { DefaultButtonIconComponent } from '../../../buttons';
import { MatButtonModule } from '@angular/material/button';
import {
  DefaultSearchBarControlsComponent,
  ListItemCategoryTransactionByBudgetControlsComponent,
} from '../../../controls';
import {
  BudgetResponseDto,
  DeleteBudgetWithCategoryTransactionDto,
  EditBudgetWithCategoryTransactionDto,
} from '@pure-workspace/domain';
import { MatList } from '@angular/material/list';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DeleteBudgetWithCategoryTransactionModalComponent } from '../delete-budget-with-category-transaction/delete-budget-with-category-transaction-modal.component';
import { EditBudgetWithTransactionByBudgetModalComponent } from '../edit-budget-with-transaction-by-budget/edit-budget-with-transaction-by-budget-modal.component';

@Component({
  selector: 'lib-list-budget-or-transactions-modal',
  templateUrl: 'list-category-transactions-by-budget-modal.component.html',
  styleUrl: 'list-category-transactions-by-budget-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DefaultButtonIconComponent,
    DefaultSearchBarControlsComponent,
    ListItemCategoryTransactionByBudgetControlsComponent,
    MatList,
    MatPaginator,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListCategoryTransactionsByBudgetModalComponent implements OnInit {
  private dialogRef = inject(
    MatDialogRef<ListCategoryTransactionsByBudgetModalComponent>
  );
  private dialogService = inject(MatDialog);
  private budgetWithCategoryTransactionsService = inject(
    BudgetWithCategoryTransactionsService
  );
  @Input() title = 'Categorias relacionadas com o orçamento';
  @Output() create = new EventEmitter<void>();
  categoryTransactions = computed(
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
    public budgetResponseDto: BudgetResponseDto
  ) {}

  ngOnInit(): void {
    this.budgetWithCategoryTransactionsService
      .findBudgetWithCategoryTransactionsByFilter({
        budgetId: this.budgetResponseDto.id,
      })
      .subscribe();
  }

  close() {
    this.dialogRef.close();
  }

  onSearchChange(value: string) {
    this.budgetWithCategoryTransactionsService.findBudgetWithCategoryTransactionsByFilter(
      {
        budgetId: this.budgetResponseDto.id,
        name: value,
      }
    );
  }

  onCreate() {
    this.create.emit();
  }

  onDeleteRelationship(
    input: Pick<DeleteBudgetWithCategoryTransactionDto, 'categoryTransactionId'>
  ) {
    this.dialogService.open(DeleteBudgetWithCategoryTransactionModalComponent, {
      data: {
        budgetId: this.budgetResponseDto.id,
        categoryTransactionId: input.categoryTransactionId,
      },
    });
  }

  onEditRelationship(
    input: Pick<EditBudgetWithCategoryTransactionDto, 'categoryTransactionId'>
  ) {
    this.dialogService.open(EditBudgetWithTransactionByBudgetModalComponent, {
      data: {
        budgetId: this.budgetResponseDto.id,
        categoryTransactionId: input.categoryTransactionId,
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
