import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';
import { DefaultLayoutComponent } from '../../components';

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
