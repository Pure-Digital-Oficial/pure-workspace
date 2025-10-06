import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'lib-sidenav-default-header',
  imports: [MatButtonModule, MatIcon, MatToolbarModule],
  templateUrl: './sidenav-default-header.component.html',
  styleUrl: './sidenav-default-header.component.scss',
})
export class SidenavDefaultHeaderComponent {
  title = input<string>();
  @Input() drawer: MatDrawer = {} as MatDrawer;
}
