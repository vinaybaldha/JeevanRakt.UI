import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from './account.service';
import { userinfo } from '../models/Employee';

export const authGuard: CanActivateFn = (route, state) => {
  let service = inject(AccountService);
  let router = inject(Router);
  let menuname = ''
  if(route.url.length>0){
    menuname = route.url[0].path
  }
  let userInfo: userinfo = service.getUserDataFromStorage();
  if (userInfo.employeeName != '' && userInfo.employeeName != null) {
    service.haveMenuAccess(userInfo.role, menuname).subscribe((item)=>{
      const _menudata = item
      if(_menudata.length>0){
        return true
      }
      else{
        alert('unauthorized access')
        router.navigate([''])
        return false
      }
    })
    return true;
  } else {
    alert('unauthorized access');
    router.navigate(['login']);
    return false;
  }
};
