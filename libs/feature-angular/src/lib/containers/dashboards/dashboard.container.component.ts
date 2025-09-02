import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DefaultLayoutComponent } from '../../components';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-dashboard-container',
  imports: [CommonModule, DefaultLayoutComponent, MatButtonModule],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
})
export class DashboardContainerComponent {}
