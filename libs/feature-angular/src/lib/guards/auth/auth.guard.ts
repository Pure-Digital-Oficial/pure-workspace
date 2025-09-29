import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../../services';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService
    .checkAuth()
    .pipe(map((isAuth) => (isAuth ? true : router.createUrlTree(['/login']))));
};
