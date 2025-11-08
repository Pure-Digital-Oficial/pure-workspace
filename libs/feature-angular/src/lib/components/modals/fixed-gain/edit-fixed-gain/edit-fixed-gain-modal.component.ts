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
import { ModalLayoutComponent } from '../../../layouts';
import {
  EditFixedGainService,
  FixedGainsService,
  SnackbarStackService,
} from '../../../../services';
import {
  FixedGainForm,
  FixedGainFrequency,
  ListFixedGainFrequencies,
} from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';
import { DefaultInputComponent } from '../../../inputs';
import { FixedGainResponseDto } from '@pure-workspace/domain';

@Component({
  selector: 'lib-edit-fixed-gain-modal',
  templateUrl: 'edit-fixed-gain-modal.component.html',
  styleUrl: 'edit-fixed-gain-modal.component.scss',
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
export class EditFixedGainModalComponent {
  private dialogRef = inject(MatDialogRef<EditFixedGainModalComponent>);
  private snackbarService = inject(SnackbarStackService);
  private editFixedGainService = inject(EditFixedGainService);
  private fixedGainsService = inject(FixedGainsService);
  form: FormGroup<FixedGainForm>;
  frequencies: FixedGainFrequency[] = ListFixedGainFrequencies;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public fixedGainResponseDto: FixedGainResponseDto
  ) {
    console.log(fixedGainResponseDto);
    this.form = this.fb.group({
      name: new FormControl(this.fixedGainResponseDto.name, [
        Validators.required,
        Validators.minLength(3),
      ]),
      dayOfReceipt: new FormControl<number>(
        this.fixedGainResponseDto.dayOfReceipt,
        [Validators.required, Validators.min(1), Validators.max(31)]
      ),
      frequency: new FormControl(this.fixedGainResponseDto.frequency, [
        Validators.required,
        Validators.minLength(1),
      ]),
      value: new FormControl<number>(this.fixedGainResponseDto.value, [
        Validators.required,
        Validators.min(0.01),
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
      this.editFixedGainService
        .edit({
          id: this.fixedGainResponseDto.id,
          name: value.name,
          value: parseFloat(value.value),
          dayOfReceipt: parseFloat(value.dayOfReceipt),
          frequency: value.frequency,
        })
        .subscribe((fixedPain) => {
          if (fixedPain) {
            this.fixedGainsService
              .listFixedGains(fixedPain.fixed_gain_id)
              .subscribe();
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
