import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isAuthenticated$.pipe(
    map(isAuth => {
      if (!isAuth) {
        auth.loginWithRedirect();
        return false;
      }
      return true;
    })
  );
};
