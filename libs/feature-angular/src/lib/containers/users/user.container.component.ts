import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components';

@Component({
  selector: 'lib-user-container-component',
  imports: [CommonModule, DefaultLayoutComponent],
  templateUrl: './user.container.component.html',
  styleUrl: './user.container.component.scss',
})
export class UsersContainerComponent {}
