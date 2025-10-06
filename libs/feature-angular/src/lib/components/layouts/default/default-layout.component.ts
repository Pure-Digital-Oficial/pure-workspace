import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { map, Observable, shareReplay } from 'rxjs';
import { SidenavItem } from '@pure-workspace/domain';
import {
  SidenavDefaultHeaderComponent,
  SidenavDefaultBodyComponent,
  SidenavDefaultFooterComponent,
} from '../../controls';

@Component({
  selector: 'lib-default-layout',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDividerModule,
    SidenavDefaultHeaderComponent,
    SidenavDefaultBodyComponent,
    SidenavDefaultFooterComponent,
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
