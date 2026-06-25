import { Route } from '@angular/router';
import { SidenavItem } from '@pure-workspace/domain';

const defaultMenuItems: SidenavItem[] = [
  { title: 'Página Principal', icon: 'home', route: '/' },
];

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@pure-workspace/feature-angular').then(
        (c) => c.BlogContainerComponent
      ),
    data: {
      title: 'Dashboard',
      menuItems: defaultMenuItems,
    },
  },
];
