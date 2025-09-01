import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DefaultLayoutComponent,
  ThemesColorsControlsComponent,
} from '../../components';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-dashboard-container',
  imports: [
    CommonModule,
    DefaultLayoutComponent,
    MatButtonModule,
    ThemesColorsControlsComponent,
  ],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
})
export class DashboardContainerComponent {}
