import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'lib-create-transaction-modal',
  templateUrl: 'create-transaction-modal.component.html',
  styleUrl: 'create-transaction-modal.component.scss',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionModalComponent {}
