import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const authGuardGuard: CanActivateFn = (route, state) => {

  // this.router.navigate(['/welcom'], { queryParams: { returnUrl: state.url } });
  // return false;

  const router = inject(Router);
  if(localStorage.getItem('idToken')){
    return true
  }
  router.navigate(['/welcome']);
  return false
};
