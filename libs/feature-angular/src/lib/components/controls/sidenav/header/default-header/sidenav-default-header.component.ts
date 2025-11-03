import { Component, Input, input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DefaultButtonIconComponent } from '../../../../buttons';

@Component({
  selector: 'lib-sidenav-default-header',
  imports: [MatToolbarModule, DefaultButtonIconComponent],
  templateUrl: './sidenav-default-header.component.html',
  styleUrl: './sidenav-default-header.component.scss',
})
export class SidenavDefaultHeaderComponent {
  title = input<string>();
  @Input() drawer: MatDrawer = {} as MatDrawer;
}
