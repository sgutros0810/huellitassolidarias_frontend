import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('authToken');
  if (token) {
    return true;
  } else {
    router.navigate(['/loginuser']);
    return false;
  }
};
