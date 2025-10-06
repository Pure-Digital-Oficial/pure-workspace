import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { SidenavItem } from '@pure-workspace/domain';
import { UserPhotoControlsComponent } from '../../../users';

@Component({
  selector: 'lib-sidenav-default-body',
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIcon,
    MatToolbarModule,
    MatDividerModule,
    MatListModule,
    UserPhotoControlsComponent,
  ],
  templateUrl: './sidenav-default-body.component.html',
  styleUrl: './sidenav-default-body.component.scss',
})
export class SidenavDefaultBodyComponent {
  @Input() menuItems: SidenavItem[] = [];

  @Input() drawer: MatDrawer = {} as MatDrawer;
}
