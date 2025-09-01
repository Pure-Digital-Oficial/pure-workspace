import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { SidenavItem } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-default-layout',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIcon,
    MatListModule,
    MatToolbarModule,
    RouterModule,
  ],
  templateUrl: './default-layout.component.html',
  styleUrl: './default-layout.component.scss',
})
export class DefaultLayoutComponent {
  @Input() menuItems: SidenavItem[] = [
    { title: 'Página Principal', icon: 'home', route: '/' },
    { title: 'Usuários', icon: 'info', route: '/users' },
  ];
  @Input() title = '';
  showFiller = false;
}
