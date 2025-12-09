import { DatePipe } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CategoryTransactionResponseDto } from '@pure-workspace/domain';
import { DefaultButtonIconComponent } from '../../../../buttons';

@Component({
  selector: 'lib-list-item-category-transaction-controls',
  imports: [
    DatePipe,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    DefaultButtonIconComponent,
  ],
  templateUrl: './list-item-category-transactions-controls.component.html',
  styleUrl: './list-item-category-transactions-controls.component.scss',
})
export class ListItemCategoryTransactionControlsComponent {
  categoryTransaction = input.required<CategoryTransactionResponseDto>();
  @Output() edit = new EventEmitter<CategoryTransactionResponseDto>();
  @Output() delete = new EventEmitter<
    Pick<CategoryTransactionResponseDto, 'id' | 'name'>
  >();
  @Output() budgets = new EventEmitter<CategoryTransactionResponseDto>();

  editAction() {
    this.edit.emit(this.categoryTransaction());
  }

  deleteAction() {
    this.delete.emit({
      id: this.categoryTransaction().id,
      name: this.categoryTransaction().name,
    });
  }

  budgetsAction() {
    this.budgets.emit(this.categoryTransaction());
  }
}
