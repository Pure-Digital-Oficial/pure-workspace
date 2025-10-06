import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  AuthLayoutComponent,
  DefaultInputComponent,
} from '../../../components';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services';

interface LoginForm {
  email: FormControl;
  password: FormControl;
}

@Component({
  selector: 'lib-default-login-container',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthLayoutComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    DefaultInputComponent,
  ],
  providers: [AuthService],
  templateUrl: './default-login.container.component.html',
  styleUrl: './default-login.container.component.scss',
})
export class DefaultLoginContainerComponent {
  loginForm!: FormGroup<LoginForm>;

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.authService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe();
  }
}
