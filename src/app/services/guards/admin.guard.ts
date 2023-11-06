import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

export const adminGuard: CanActivateFn = () => {

  const router = inject(Router);
  const loginService = inject(LoginService);

  if (loginService.isLoggedIn() && loginService.getUserRole() === 'ROLE_ADMIN') {
    console.log("ingresando a admin");
    return true;
  }

  router.navigate(['login']);
  return false;
};
