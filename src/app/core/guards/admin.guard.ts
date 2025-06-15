import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { map, of, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.profile$.pipe(
    switchMap(profile => {
      if (profile) {
        if (profile.role === 'ADMIN') {
          return of(true);
        } else {
          router.navigate(['/']);
          return of(false);
        }
      } else {
        // Si no hay perfil cargado, obtenerlo del backend
        return userService.getProfile().pipe(
          map(profile => {
            if (profile.role === 'ADMIN') {
              return true;
            } else {
              router.navigate(['/']);
              return false;
            }
          })
        );
      }
    })
  );
};
