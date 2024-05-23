import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '../../services/account.service';
import {
  beginLogin,
  beginRegister,
  duplicateUser,
  duplicateUserSuccess,
  emptyAction,
  fetchMenu,
  fetchMenuSuccess,
  getUser,
  getUserSuccess,
  showAlert,
  uploadImage,
  uploadImageSuccess,
} from './user.actions';
import { Router } from '@angular/router';
import { loadBloodBankById } from '../blood-bank/bloodbank.actions';
import { loadSpinner } from '../Globel/globel.actions';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: AccountService,
    private _snackbar: MatSnackBar,
    private router: Router
  ) {}

  _userregister = createEffect(() =>
    this.action$.pipe(
      ofType(beginRegister),
      switchMap((action) => {
        return this.userService.registerEmployee(action.userdata).pipe(
          switchMap((data) => {
            this.router.navigate(['login']);
            return of(
              showAlert({
                message: 'Registerd Successfully',
                resptype: 'pass',
              }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({
                message: 'Registration Fail due to: ' + _err.message,
                resptype: 'fail',
              }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _userlogin = createEffect(() =>
    this.action$.pipe(
      ofType(beginLogin),
      switchMap((action) => {
        return this.userService
          .loginEmployee(action.userdata.email, action.userdata.password)
          .pipe(
            switchMap((data) => {
              const expirationDuration =
                new Date(data.expiration).getTime() - new Date().getTime();
              this.userService.autoLogout(expirationDuration);
              this.userService.setUserToLocalStorage(data);
              this.userService.currentUserSubject.next(data);
              this.router.navigate(['']);
              if (data.bloodBankId !== null) {
                return of(
                  fetchMenu({ userrole: data.role }),
                  showAlert({
                    message: 'Login Successfully',
                    resptype: 'pass',
                  }),
                  loadBloodBankById({ id: data.bloodBankId }),
                  loadSpinner({ isLoaded: false })
                );
              } else {
                return of(
                  fetchMenu({ userrole: data.role }),
                  showAlert({
                    message: 'Login Successfully',
                    resptype: 'pass',
                  }),
                  loadSpinner({ isLoaded: false })
                );
              }
            }),
            catchError((_err) =>
              of(
                showAlert({
                  message: 'Login Fail due to: ' + _err.message,
                  resptype: 'fail',
                }),
                loadSpinner({ isLoaded: false })
              )
            )
          );
      })
    )
  );

  _duplicateuser = createEffect(() =>
    this.action$.pipe(
      ofType(duplicateUser),
      switchMap((action) => {
        return this.userService.duplicateUserName(action.username).pipe(
          switchMap((data) => {
            if (data) {
              return of(
                duplicateUserSuccess({ isDuplicate: true }),
                showAlert({ message: 'Email Already Exist', resptype: 'fail' }),
                loadSpinner({ isLoaded: false })
              );
            } else {
              return of(duplicateUserSuccess({ isDuplicate: false }));
            }
          }),
          catchError((_err) =>
            of(
              showAlert({
                message: 'Login Fail due to: ' + _err.message,
                resptype: 'fail',
              }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _loadmenubyrole = createEffect(() =>
    this.action$.pipe(
      ofType(fetchMenu),
      switchMap((action) => {
        return this.userService.getMenuByRole(action.userrole).pipe(
          switchMap((data) => {
            return of(
              fetchMenuSuccess({ menulist: data }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({
                message: 'Fail to fetch MenuList due to: ' + _err.message,
                resptype: 'fail',
              }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _getallusers = createEffect(() =>
    this.action$.pipe(
      ofType(getUser),
      switchMap((action) => {
        return this.userService.getEmployeeList().pipe(
          switchMap((data) => {
            return of(
              getUserSuccess({ userlist: data }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({
                message: 'Fail to get userlist due to: ' + _err.message,
                resptype: 'fail',
              }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _showAlert = createEffect(() =>
    this.action$.pipe(
      ofType(showAlert),
      exhaustMap((action) => {
        return this.ShowSnackBarAlert(action.message, action.resptype)
          .afterDismissed()
          .pipe(
            map(() => {
              return emptyAction();
            })
          );
      })
    )
  );

  _uploadImage = createEffect(() =>
    this.action$.pipe(
      ofType(uploadImage),
      switchMap((action) => {
        return this.userService.updateProfileImage(action.image).pipe(
          switchMap((data) => {
            return of(
              uploadImageSuccess({ imageUrl: data.toString() }),
              showAlert({
                message: 'Image Upload Successfully',
                resptype: 'pass',
              }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({
                message: 'Image Upload Fail' + _err.message,
                resptype: 'fail',
              }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  ShowSnackBarAlert(message: string, resptype: string = 'fail') {
    let _class = resptype === 'pass' ? 'text-green' : 'text-red';

    return this._snackbar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class],
    });
  }
}
