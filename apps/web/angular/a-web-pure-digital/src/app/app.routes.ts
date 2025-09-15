import { Route } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';
import { authGuard } from '@pure-workspace/feature-angular';

const defaultMenuItems: SidenavItem[] = [
  { title: 'Página Principal', icon: 'home', route: '/' },
  { title: 'Usuários', icon: 'info', route: '/users' },
];

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.DashboardContainerComponent
      ),
    canActivate: [authGuard],
    data: {
      title: 'Dashboard',
      menuItems: defaultMenuItems,
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.DefaultLoginContainerComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.UsersContainerComponent
      ),
  },
];
