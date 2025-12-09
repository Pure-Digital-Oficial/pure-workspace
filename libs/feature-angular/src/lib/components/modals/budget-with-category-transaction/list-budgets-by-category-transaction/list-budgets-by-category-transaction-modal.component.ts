import {
  ChangeDetectionStrategy,
  Component,
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
import { CategoryTransactionResponseDto } from '@pure-workspace/domain';
import { BudgetWithCategoryTransactionsService } from '../../../../services';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DefaultButtonIconComponent } from '../../../buttons';
import { DefaultSearchBarControlsComponent } from '../../../controls';
import { MatIcon } from '@angular/material/icon';

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
}
