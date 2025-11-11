import { Route } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';
import { authGuard } from '@pure-workspace/feature-angular';

const defaultMenuItems: SidenavItem[] = [
  { title: 'Página Principal', icon: 'home', route: '/' },
  { title: 'Ganhos Fixos', icon: 'paid', route: '/fixed-gain' },
  { title: 'Orçamento', icon: 'account_balance_wallet', route: '/budget' },
  {
    title: 'Transações',
    icon: 'currency_exchange',
    children: [
      {
        title: 'Transações',
        icon: 'currency_exchange',
        route: '/transactions',
      },
      {
        title: 'Categorias',
        icon: 'category',
        route: '/category-transactions',
      },
    ],
  },
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
    path: 'category-transactions',
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
    path: 'fixed-gain',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.DefaultFixedGainContainerComponent
      ),
    canActivate: [authGuard],
    data: {
      title: 'Ganhos Fixos',
      menuItems: defaultMenuItems,
    },
  },
  {
    path: 'budget',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.DefaultBudgetContainerComponent
      ),
    canActivate: [authGuard],
    data: {
      title: 'Orçamento',
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
