import { CanActivateFn, Router } from '@angular/router';

export const guestGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token');
  if (!token) {
    return true;
  }

  const router = new Router();
  router.navigate(['/dashboard']);
  return false;

};
