import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ModalLayoutComponent } from '../../../layouts';
import {
  CreateBudgetService,
  SnackbarStackService,
} from '../../../../services';
import { BudgetForm } from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';
import { DefaultInputComponent } from '../../../inputs';

@Component({
  selector: 'lib-create-budget-modal',
  templateUrl: 'create-budget-modal.component.html',
  styleUrl: 'create-budget-modal.component.scss',
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
export class CreateBudgetModalComponent {
  private dialogRef = inject(MatDialogRef<CreateBudgetModalComponent>);
  private snackbarService = inject(SnackbarStackService);
  private createBudgetService = inject(CreateBudgetService);
  // private fixedGainsService = inject(FixedGainsService);
  form: FormGroup<BudgetForm>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      limitValue: new FormControl<number>(0, [
        Validators.required,
        Validators.min(0.01),
      ]),
      description: new FormControl('', [
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
      this.createBudgetService
        .create({
          name: value.name,
          limitValue: parseFloat(value.limitValue),
          description: value.description,
        })
        .subscribe((budget) => {
          if (budget) {
            // this.fixedGainsService
            //   .listFixedGains(fixedPain.fixed_gain_id)
            //   .subscribe();
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
