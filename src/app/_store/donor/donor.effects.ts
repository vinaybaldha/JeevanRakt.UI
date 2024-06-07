import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DonorService } from '../../services/donor.service';
import {
  addDonor,
  addDonorSuccess,
  deleteDonor,
  deleteDonorSuccess,
  emptyAction,
  loadDonor,
  loadDonorFail,
  loadDonorSuccess,
  showAlert,
  updateDonor,
  updateDonorSuccess,
} from './donor.actions';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadSpinner } from '../Globel/globel.actions';
import { Notification } from '../../models/Notification';
import { Recipient } from '../../models/Recipient';
import { AccountService } from '../../services/account.service';
import { Donor } from '../../models/donor';

@Injectable()
export class DonorEffects {
  constructor(
    private action$: Actions,
    private donorService: DonorService,
    private _snackbar: MatSnackBar,
    private authService: AccountService
  ) {}

  _loadDonor = createEffect(() =>
    this.action$.pipe(
      ofType(loadDonor),
      switchMap((action) => {
        return this.donorService
          .getDonorList(action.bloodbankId, action.filter)
          .pipe(
            switchMap((data) => {
              return of(
                loadDonorSuccess({ list: data }),
                loadSpinner({ isLoaded: false })
              );
            }),
            catchError((_err) =>
              of(
                loadDonorFail({ errormessage: _err.message }),
                loadSpinner({ isLoaded: false })
              )
            )
          );
      })
    )
  );

  _addDonor = createEffect(() =>
    this.action$.pipe(
      ofType(addDonor),
      switchMap((action) => {
        return this.donorService.addDonorFromRemote(action.inputData).pipe(
          switchMap((data:Donor) => {
            var notification = new Notification()
            notification.productID = data.donorId;
            notification.productName = data.donorName;
            notification.message = `blood donation request from ${data.donorName}`
            this.authService.addNotification(notification).subscribe((result) => {
              console.log('send notification');
            });
            return of(
              addDonorSuccess({ inputData: action.inputData }),
              loadSpinner({ isLoaded: false }),
              showAlert({ message: 'added successfully', resptype: 'pass' })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({ message: 'add fail', resptype: 'fail' }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _updateDonor = createEffect(() =>
    this.action$.pipe(
      ofType(updateDonor),
      switchMap((action) => {
        return this.donorService.updateDonor(action.inputData).pipe(
          switchMap((data) => {
            return of(
              updateDonorSuccess({ inputData: action.inputData }),
              loadSpinner({ isLoaded: false }),
              showAlert({ message: 'updated successfully', resptype: 'pass' })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({ message: 'updated fail', resptype: 'fail' }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _deleteDonor = createEffect(() =>
    this.action$.pipe(
      ofType(deleteDonor),
      switchMap((action) => {
        return this.donorService.deleteDonor(action.donorId).pipe(
          switchMap((data) => {
            return of(
              deleteDonorSuccess({ donorId: action.donorId }),
              loadSpinner({ isLoaded: false }),
              showAlert({ message: 'removed successfully', resptype: 'pass' })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({ message: `remove fail`, resptype: 'fail' }),
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
