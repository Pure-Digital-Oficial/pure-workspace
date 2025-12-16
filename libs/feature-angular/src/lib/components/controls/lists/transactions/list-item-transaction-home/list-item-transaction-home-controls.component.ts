import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TransactionResponseDto } from '@pure-workspace/domain';
import { TransactionTypePipe } from '../../../../../pipes';

@Component({
  selector: 'lib-list-item-transaction-home-controls',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    TransactionTypePipe,
  ],
  templateUrl: './list-item-transaction-home-controls.component.html',
  styleUrl: './list-item-transaction-home-controls.component.scss',
})
export class ListItemTransactionHomeControlsComponent {
  transaction = input.required<TransactionResponseDto>();

  value = computed(() => {
    if (this.transaction().type === 'WITHDRAW') {
      return -this.transaction().value;
    }

    return this.transaction().value;
  });
}
