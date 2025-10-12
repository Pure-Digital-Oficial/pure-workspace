import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services';
import { SidenavItem } from '@pure-workspace/domain';
import { ActivatedRoute } from '@angular/router';
import { DefaultLayoutComponent } from '../../../components';

@Component({
  selector: 'lib-default-transactions-container',
  imports: [DefaultLayoutComponent],
  providers: [AuthService],
  templateUrl: './default-transactions.container.component.html',
  styleUrl: './default-transactions.container.component.scss',
})
export class DefaultTransactionsContainerComponent {
  @Input() title = '';
  @Input() menuItems: SidenavItem[] = [];

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.menuItems = data['menuItems'] || [];
      this.title = data['title'] || '';
    });
  }
}
