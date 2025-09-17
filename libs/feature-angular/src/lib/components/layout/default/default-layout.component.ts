import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { SidenavItem } from '@pure-workspace/domain';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  ThemeColorControlsComponent,
  UserPhotoControlsComponent,
} from '../../controls';
import { map, Observable, shareReplay } from 'rxjs';

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
    MatDividerModule,
    RouterModule,
    ThemeColorControlsComponent,
    UserPhotoControlsComponent,
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
  drawerMode: 'side' | 'over' = 'side';
  private breakpointObserver = inject(BreakpointObserver);

  drawerMode$: Observable<'side' | 'over'> = this.breakpointObserver
    .observe(['(max-width: 1024px)'])
    .pipe(
      map((result) => (result.matches ? 'over' : 'side')),
      shareReplay(1)
    );
}
