import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BudgetResponseDto } from '@pure-workspace/domain';
import { ModalLayoutComponent } from '../../../layouts';
import {
  BudgetsService,
  EditBudgetService,
  SnackbarStackService,
} from '../../../../services';
import { BudgetForm } from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';
import { DefaultInputComponent } from '../../../inputs';

@Component({
  selector: 'lib-edit-budget-modal',
  templateUrl: 'edit-budget-modal.component.html',
  styleUrl: 'edit-budget-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    ModalLayoutComponent,
    DefaultInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBudgetModalComponent {
  private dialogRef = inject(MatDialogRef<EditBudgetModalComponent>);
  private snackbarService = inject(SnackbarStackService);
  private editBudgetService = inject(EditBudgetService);
  private budgetsService = inject(BudgetsService);
  form: FormGroup<BudgetForm>;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public budgetResponseDto: BudgetResponseDto
  ) {
    this.form = this.fb.group({
      name: new FormControl(this.budgetResponseDto.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      limitValue: new FormControl<number>(this.budgetResponseDto.limitValue, [
        Validators.required,
        Validators.min(0.01),
      ]),
      description: new FormControl(this.budgetResponseDto.description, [
        Validators.required,
        Validators.minLength(1),
      ]),
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const errors = getFormValidationErrors(this.form);

    if (errors.length === 0) {
      const value = this.form.value;
      this.editBudgetService
        .edit({
          id: this.budgetResponseDto.id,
          name: value.name,
          limitValue: parseFloat(value.limitValue),
          description: value.description,
        })
        .subscribe((budget) => {
          if (budget) {
            this.budgetsService.listBudgets(budget.budget_id).subscribe();
            this.close();
          }
        });
    } else {
      for (const error of errors) {
        this.snackbarService.show(error, 'warning');
      }
    }
  }
}
