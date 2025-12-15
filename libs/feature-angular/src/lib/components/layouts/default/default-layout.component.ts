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
import { AnimatedBackgroundComponent } from '../../animations';

@Component({
  selector: 'lib-default-layout',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDividerModule,
    SidenavDefaultHeaderComponent,
    SidenavDefaultBodyComponent,
    SidenavDefaultFooterComponent,
    AnimatedBackgroundComponent,
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
  @Input() backgroundIcons = [
    'svg/icons/Money_Bag.svg',
    'svg/icons/Pig_Money.svg',
    'svg/icons/Pig_Bank.svg',
  ];
  animedtedQuantity = this.breakpointObserver
    .observe(['(max-width: 1024px)'])
    .pipe(map((result) => (result.matches ? 25 : 50)));

  drawerMode$: Observable<'side' | 'over'> = this.breakpointObserver
    .observe(['(max-width: 1024px)'])
    .pipe(
      map((result) => (result.matches ? 'over' : 'side')),
      shareReplay(1)
    );
}
