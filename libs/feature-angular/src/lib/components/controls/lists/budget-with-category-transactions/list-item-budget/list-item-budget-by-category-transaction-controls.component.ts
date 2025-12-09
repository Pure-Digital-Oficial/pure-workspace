import { Component, EventEmitter, input, Output } from '@angular/core';
import {
  BudgetWithCategoryTransactionResponseDto,
  DeleteBudgetWithCategoryTransactionDto,
} from '@pure-workspace/domain';
import { MatListModule } from '@angular/material/list';
import { DefaultButtonIconComponent } from '../../../../buttons';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-list-item-budget-by-category-transaction-controls',
  imports: [
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    DefaultButtonIconComponent,
  ],
  templateUrl:
    './list-item-budget-by-category-transaction-controls.component.html',
  styleUrl:
    './list-item-budget-by-category-transaction-controls.component.scss',
})
export class ListItemBudgetByCategoryTransactionControlsComponent {
  budget =
    input.required<Pick<BudgetWithCategoryTransactionResponseDto, 'budget'>>();
  @Output() delete = new EventEmitter<
    Pick<DeleteBudgetWithCategoryTransactionDto, 'budgetId'>
  >();

  @Output() edit = new EventEmitter<
    Pick<DeleteBudgetWithCategoryTransactionDto, 'budgetId'>
  >();

  editAction() {
    this.edit.emit({
      budgetId: this.budget().budget.id,
    });
  }

  deleteAction() {
    this.delete.emit({
      budgetId: this.budget().budget.id,
    });
  }
}
