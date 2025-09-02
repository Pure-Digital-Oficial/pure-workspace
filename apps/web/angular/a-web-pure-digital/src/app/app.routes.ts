import { Route } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';

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
    data: {
      title: 'Dashboard',
      menuItems: defaultMenuItems,
    },
  },
  {
    path: 'users',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.UsersContainerComponent
      ),
  },
];
