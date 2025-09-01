import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.DashboardContainerComponent
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
