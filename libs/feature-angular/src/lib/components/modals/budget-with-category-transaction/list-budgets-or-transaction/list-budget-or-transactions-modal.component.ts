import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SnackbarStackService } from '../../../../services';
import { DefaultButtonIconComponent } from '../../../buttons';
import { MatButtonModule } from '@angular/material/button';
import { DefaultSearchBarControlsComponent } from '../../../controls';

@Component({
  selector: 'lib-list-budget-or-transactions-modal',
  templateUrl: 'list-budget-or-transactions-modal.component.html',
  styleUrl: 'list-budget-or-transactions-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DefaultButtonIconComponent,
    DefaultSearchBarControlsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBudgetOrTransactionsModalComponent {
  private dialogRef = inject(
    MatDialogRef<ListBudgetOrTransactionsModalComponent>
  );
  private snackbarService = inject(SnackbarStackService);
  @Input() title = 'Modal Title';

  close() {
    this.dialogRef.close();
  }

  onSearchChange(value: string) {
    console.log(value);
  }

  onCreate() {
    console.log('clicou');
  }
}
