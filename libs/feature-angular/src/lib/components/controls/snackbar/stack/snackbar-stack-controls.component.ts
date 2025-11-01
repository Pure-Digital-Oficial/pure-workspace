import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SnackbarStackService } from '../../../../services';

@Component({
  selector: 'lib-snackbar-stack-controls',
  templateUrl: 'snackbar-stack-controls.component.html',
  styleUrl: 'snackbar-stack-controls.component.scss',
  imports: [CommonModule, MatIcon, MatButtonModule],
})
export class SnackbarStackControlsComponent {
  constructor(public service: SnackbarStackService) {}
}
