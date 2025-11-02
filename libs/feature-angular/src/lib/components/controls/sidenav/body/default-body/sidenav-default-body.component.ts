import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { SidenavItem } from '@pure-workspace/domain';
import { UserPhotoControlsComponent } from '../../../users';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'lib-sidenav-default-body',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule,
    UserPhotoControlsComponent,
    MatDivider,
  ],
  templateUrl: './sidenav-default-body.component.html',
  styleUrl: './sidenav-default-body.component.scss',
})
export class SidenavDefaultBodyComponent {
  @Input() menuItems: SidenavItem[] = [];
  @Input() drawer: MatDrawer = {} as MatDrawer;

  getChildren = (node: SidenavItem) => node.children ?? [];
}
