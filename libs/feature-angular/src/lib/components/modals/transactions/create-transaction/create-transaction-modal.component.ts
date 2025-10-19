import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DefaultInputComponent } from '../../../inputs';

interface TransactionForm {
  name: FormControl;
  value: FormControl;
  categoryId: FormControl;
  type: FormControl;
}

@Component({
  selector: 'lib-create-transaction-modal',
  templateUrl: 'create-transaction-modal.component.html',
  styleUrl: 'create-transaction-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    DefaultInputComponent,
    MatIcon,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTransactionModalComponent {
  form: FormGroup<TransactionForm>;
  categories = computed(() => [
    {
      id: '1',
      name: 'TEST',
    },
  ]);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      value: new FormControl('', [Validators.required, Validators.min(0.01)]),
      categoryId: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      type: new FormControl('', [Validators.required, Validators.minLength(1)]),
    });
  }

  onSubmit() {
    if (!this.form.invalid) {
      console.log('Form submitted:', this.form.value);
    } else {
      console.log('Form errors:', this.form.errors);
    }
  }
}
