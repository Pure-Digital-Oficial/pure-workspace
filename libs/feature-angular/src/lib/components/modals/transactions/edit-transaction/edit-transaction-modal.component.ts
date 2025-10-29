import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { getFormValidationErrors } from '../../../../utils';
import { TransactionForm } from '../../../../models';
import { DefaultInputComponent } from '../../../inputs';
import { ModalLayoutComponent } from '../../../layouts';
import { TransactionResponseDto } from '@pure-workspace/domain';

@Component({
  selector: 'lib-edit-transaction-modal',
  templateUrl: 'edit-transaction-modal.component.html',
  styleUrl: 'edit-transaction-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DefaultInputComponent,
    ModalLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTransactionModalComponent {
  private dialogRef = inject(MatDialogRef<EditTransactionModalComponent>);
  form: FormGroup<TransactionForm>;
  categories = computed(() => [
    {
      id: '1',
      name: 'TEST',
    },
  ]);

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public transactionData: TransactionResponseDto
  ) {
    this.form = this.fb.group({
      name: new FormControl(this.transactionData.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      value: new FormControl(this.transactionData.value, [
        Validators.required,
        Validators.min(0.01),
      ]),
      categoryId: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      type: new FormControl(this.transactionData.type, [
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
      console.log('Form Submitted', this.form.value);
    } else {
      console.log('Form Errors', errors);
    }
  }
}
