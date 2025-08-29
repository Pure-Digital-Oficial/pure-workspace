import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemesColorsControlsComponent } from '../../components';

@Component({
  selector: 'lib-dashboard-container',
  imports: [CommonModule, ThemesColorsControlsComponent],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
})
export class DashboardContainerComponent {}
