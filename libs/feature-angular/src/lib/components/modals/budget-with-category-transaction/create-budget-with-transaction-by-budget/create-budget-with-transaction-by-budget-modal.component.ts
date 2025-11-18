import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ModalLayoutComponent } from '../../../layouts';
import { BudgetResponseDto } from '@pure-workspace/domain';

@Component({
  selector: 'lib-create-budget-with-transaction-by-budget-modal',
  templateUrl: 'create-budget-with-transaction-by-budget-modal.component.html',
  styleUrl: 'create-budget-with-transaction-by-budget-modal.component.scss',
  imports: [ModalLayoutComponent],
})
export class CreateBudgetWithTransactionByBudgetModalComponent {
  private dialogRef = inject(
    MatDialogRef<CreateBudgetWithTransactionByBudgetModalComponent>
  );

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public budgetResponseDto: BudgetResponseDto
  ) {}

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log(this.budgetResponseDto);
  }
}
