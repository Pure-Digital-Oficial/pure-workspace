import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DefaultLayoutComponent } from '../../components';
import { MatButtonModule } from '@angular/material/button';
import { SidenavItem } from '@pure-workspace/domain';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'lib-dashboard-container',
  imports: [CommonModule, DefaultLayoutComponent, MatButtonModule],
  templateUrl: './dashboard.container.component.html',
  styleUrl: './dashboard.container.component.scss',
})
export class DashboardContainerComponent {
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }
}
