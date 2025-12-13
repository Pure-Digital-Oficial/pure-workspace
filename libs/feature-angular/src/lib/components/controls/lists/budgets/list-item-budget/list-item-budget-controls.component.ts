import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BudgetResponseDto } from '@pure-workspace/domain';
import { DefaultButtonIconComponent } from '../../../../buttons';

@Component({
  selector: 'lib-list-item-budget-controls',
  imports: [
    DatePipe,
    CurrencyPipe,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    MatTooltipModule,
    DefaultButtonIconComponent,
  ],
  templateUrl: './list-item-budget-controls.component.html',
  styleUrl: './list-item-budget-controls.component.scss',
})
export class ListItemBudgetControlsComponent {
  budget = input.required<BudgetResponseDto>();
  @Output() edit = new EventEmitter<BudgetResponseDto>();
  @Output() delete = new EventEmitter<Pick<BudgetResponseDto, 'id' | 'name'>>();
  @Output() categories = new EventEmitter<BudgetResponseDto>();

  editAction() {
    this.edit.emit(this.budget());
  }

  deleteAction() {
    this.delete.emit({
      id: this.budget().id,
      name: this.budget().name,
    });
  }

  categoriesAction() {
    this.categories.emit(this.budget());
  }
}
