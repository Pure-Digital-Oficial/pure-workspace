import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { TransactionResponseDto } from '@pure-workspace/domain';

@Component({
  selector: 'lib-list-item-transaction-controls',
  imports: [CurrencyPipe, DatePipe, MatListModule],
  templateUrl: './list-item-transaction-controls.component.html',
  styleUrl: './list-item-transaction-controls.component.scss',
})
export class ListItemTransactionControlsComponent {
  transaction = input.required<TransactionResponseDto>();

  value = computed(() => {
    if (this.transaction().type === 'WITHDRAW') {
      return -this.transaction().value;
    }

    return this.transaction().value;
  });
}
