import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  let _token = localStorage.getItem('jwtToken')
  let jwtToken = req.clone({
    setHeaders:{
      Authorization: 'bearer '+_token
    }
  })
  return next(jwtToken);
};
