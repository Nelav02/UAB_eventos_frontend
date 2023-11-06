import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

export const userGuard: CanActivateFn = (route, state) => {
  
  const router = inject(Router);
  const loginService = inject(LoginService);

  if (loginService.isLoggedIn() && loginService.getUserRole() === 'ROLE_USER') {
    console.log("ingresando a user");
    return true;
  }

  router.navigate(['login']);
  return false;
};
