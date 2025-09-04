import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthLayoutComponent } from '../../../components';

@Component({
  selector: 'lib-default-login-container',
  imports: [CommonModule, AuthLayoutComponent, MatButtonModule],
  templateUrl: './default-login.container.component.html',
  styleUrl: './default-login.container.component.scss',
})
export class DefaultLoginContainerComponent {}
