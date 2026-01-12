import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardForm } from '../../../../models';
import { getFormValidationErrors } from '../../../../utils';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-filters-dashboard-controls',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    ɵInternalFormsSharedModule,
  ],
  templateUrl: './filters-dashboard-controls.component.html',
  styleUrl: './filters-dashboard-controls.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class FiltersDashboardControlsComponent {
  form!: FormGroup<DashboardForm>;
  @Output() submitForm = new EventEmitter<void>();

  constructor() {
    this.form = new FormGroup({
      initialDate: new FormControl('', [Validators.required]),
      finalDate: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.form.markAllAsTouched();
    const errors = getFormValidationErrors(this.form);

    if (errors.length === 0) {
      console.log(
        this.form.value.finalDate + ' --- ' + this.form.value.initialDate
      );
    }
  }
}
