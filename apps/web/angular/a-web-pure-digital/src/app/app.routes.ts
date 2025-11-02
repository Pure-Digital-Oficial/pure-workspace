import { Route } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';
import { authGuard } from '@pure-workspace/feature-angular';

const defaultMenuItems: SidenavItem[] = [
  { title: 'Página Principal', icon: 'home', route: '/' },
  {
    title: 'Categorias T',
    icon: 'category',
    route: '/category-transacitons',
  },
  { title: 'Transações', icon: 'currency_exchange', route: '/transactions' },
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
    path: 'transactions',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.DefaultTransactionsContainerComponent
      ),
    canActivate: [authGuard],
    data: {
      title: 'Transações',
      menuItems: defaultMenuItems,
    },
  },
  {
    path: 'category-transacitons',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.CategoryTransactionsContainerComponent
      ),
    canActivate: [authGuard],
    data: {
      title: 'Categorias das transações',
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
    canActivate: [authGuard],
  },
];
