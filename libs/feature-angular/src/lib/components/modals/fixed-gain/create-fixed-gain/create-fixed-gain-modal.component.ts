import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ModalLayoutComponent } from '../../../layouts';
import { CreateFixedGainService } from '../../../../services';

@Component({
  selector: 'lib-create-fixed-gain-modal',
  templateUrl: 'create-fixed-gain-modal.component.html',
  styleUrl: 'create-fixed-gain-modal.component.scss',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    ModalLayoutComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateFixedGainModalComponent {
  private dialogRef = inject(MatDialogRef<CreateFixedGainModalComponent>);
  // private snackbarService = inject(SnackbarStackService);
  private createFixedGainService = inject(CreateFixedGainService);
  // private categoryTransactionsService = inject(CategoryTransactionsService);
  // form: FormGroup<CategoryTransactionForm>;

  // constructor(private fb: FormBuilder) {
  //   this.form = this.fb.group({
  //     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  //   });
  // }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    console.log('submit');
  }
}
