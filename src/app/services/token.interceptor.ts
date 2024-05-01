import { HttpInterceptorFn } from '@angular/common/http';
import { userinfo } from '../models/Employee';
import { inject } from '@angular/core';
import { AccountService } from './account.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let service = inject(AccountService)
  let userInfo: userinfo = service.getUserDataFromStorage()
  let _token = userInfo.token
  let jwtToken = req.clone({
    setHeaders:{
      Authorization: 'bearer '+_token
    }
  })
  return next(jwtToken);
};
