import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components';

@Component({
  selector: 'lib-dashboard-container',
  imports: [CommonModule, DefaultLayoutComponent],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
})
export class DashboardContainerComponent {}
