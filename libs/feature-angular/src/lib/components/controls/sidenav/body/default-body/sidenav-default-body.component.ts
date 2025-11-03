import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDrawer } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { SidenavItem } from '@pure-workspace/domain';
import { MatDivider } from '@angular/material/divider';
import { UserPhotoControlsComponent } from '../../../users';
import { DefaultButtonIconComponent } from '../../../../buttons';

@Component({
  selector: 'lib-sidenav-default-body',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTreeModule,
    MatIconModule,
    MatDivider,
    UserPhotoControlsComponent,
    DefaultButtonIconComponent,
  ],
  templateUrl: './sidenav-default-body.component.html',
  styleUrl: './sidenav-default-body.component.scss',
})
export class SidenavDefaultBodyComponent {
  @Input() menuItems: SidenavItem[] = [];
  @Input() drawer: MatDrawer = {} as MatDrawer;

  getChildren = (node: SidenavItem) => node.children ?? [];

  hasChild = (_: number, node: SidenavItem) =>
    !!node.children && node.children.length > 0;
}
