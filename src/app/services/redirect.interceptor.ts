// import { HttpInterceptorFn } from '@angular/common/http';
// import { catchError, throwError } from 'rxjs';

// export const redirectInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req).pipe(
//     catchError((err) => {
//       if (err.status === 303) {
//         window.location.href = err.headers.get('Location');
//       }
//       return throwError(err);
//     })
//   );
// };
