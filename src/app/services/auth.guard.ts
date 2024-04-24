import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';

export const authGuard: CanActivateFn = (route, state) => {
  let service = inject(AccountService)
  let router = inject(Router)
  if(service.haveSuccess()){
    return true
  }
  else{
    alert('unauthorized access')
    router.navigate(['/'])
    return false
  }
};
