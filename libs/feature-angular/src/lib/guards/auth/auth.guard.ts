import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { SessionStorageService, AuthService } from '../../services';

export const authGuard: CanActivateFn = () => {
  const storageService = inject(SessionStorageService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const authToken = storageService.getToken();
  const refreshToken = storageService.getRefreshToken();

  if (authToken) {
    return true;
  }

  if (refreshToken) {
    return authService.refresh(refreshToken).pipe(
      map(() => true),
      catchError(() => of(router.createUrlTree(['/login'])))
    );
  }

  return router.createUrlTree(['/login']);
};
