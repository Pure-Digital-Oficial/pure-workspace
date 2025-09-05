import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  AuthLayoutComponent,
  DefaultInputComponent,
} from '../../../components';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'lib-default-login-container',
  imports: [
    CommonModule,
    AuthLayoutComponent,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    DefaultInputComponent,
    DefaultInputComponent,
  ],
  templateUrl: './default-login.container.component.html',
  styleUrl: './default-login.container.component.scss',
})
export class DefaultLoginContainerComponent {}
