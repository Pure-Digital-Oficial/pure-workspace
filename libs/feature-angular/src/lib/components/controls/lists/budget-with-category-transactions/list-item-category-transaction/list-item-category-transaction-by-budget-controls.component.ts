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
  selector: 'lib-list-item-category-transaction-by-budget-controls',
  imports: [
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    DefaultButtonIconComponent,
  ],
  templateUrl:
    './list-item-category-transaction-by-budget-controls.component.html',
  styleUrl:
    './list-item-category-transaction-by-budget-controls.component.scss',
})
export class ListItemCategoryTransactionByBudgetControlsComponent {
  categoryTransaction =
    input.required<
      Pick<BudgetWithCategoryTransactionResponseDto, 'categoryTransaction'>
    >();
  @Output() delete = new EventEmitter<
    Pick<DeleteBudgetWithCategoryTransactionDto, 'categoryTransactionId'>
  >();

  editAction() {
    console.log('Edit action for budget:', this.categoryTransaction());
  }

  deleteAction() {
    this.delete.emit({
      categoryTransactionId: this.categoryTransaction().categoryTransaction.id,
    });
  }
}
