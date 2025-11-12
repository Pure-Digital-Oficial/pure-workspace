import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  Input,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { BudgetResponseDto } from '@pure-workspace/domain';
import { BudgetsService, DeleteBudgetService } from '../../../../services';
import { ModalLayoutComponent } from '../../../layouts';

@Component({
  selector: 'lib-delete-budget-modal',
  templateUrl: 'delete-budget-modal.component.html',
  styleUrl: 'delete-budget-modal.component.scss',
  imports: [MatDialogModule, ModalLayoutComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteBudgetModalComponent {
  private dialogRef = inject(MatDialogRef<DeleteBudgetModalComponent>);
  private deleteBudgetService = inject(DeleteBudgetService);
  private budgetsService = inject(BudgetsService);
  @Input() title = 'Tem certeza que deseja excluir o orçamento';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public fixedGainData: Pick<BudgetResponseDto, 'id' | 'name'>
  ) {}

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.deleteBudgetService
      .delete({
        id: this.fixedGainData.id,
      })
      .subscribe((budget) => {
        if (budget) {
          this.budgetsService.listBudgets(budget.budget_id).subscribe();
          this.close();
        }
      });
  }
}
