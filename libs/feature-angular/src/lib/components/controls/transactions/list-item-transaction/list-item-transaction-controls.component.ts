import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TransactionResponseDto } from '@pure-workspace/domain';

@Component({
  selector: 'lib-list-item-transaction-controls',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatListModule,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './list-item-transaction-controls.component.html',
  styleUrl: './list-item-transaction-controls.component.scss',
})
export class ListItemTransactionControlsComponent {
  transaction = input.required<TransactionResponseDto>();
  @Output() edit = new EventEmitter<TransactionResponseDto>();

  value = computed(() => {
    if (this.transaction().type === 'WITHDRAW') {
      return -this.transaction().value;
    }

    return this.transaction().value;
  });

  editAction() {
    this.edit.emit(this.transaction());
  }
}
