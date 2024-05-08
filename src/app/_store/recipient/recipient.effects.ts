import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { RecipientService } from '../../services/recipient.service';
import {
  addRecipient,
  addRecipientSuccess,
  deleteRecipient,
  deleteRecipientSuccess,
  emptyAction,
  loadRecipient,
  loadRecipientFail,
  loadRecipientSuccess,
  showAlert,
  updateRecipient,
  updateRecipientSuccess,
} from './reipient.actions';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class RecipientEffects {
  constructor(
    private action$: Actions,
    private recipientService: RecipientService,
    private _snackbar: MatSnackBar
  ) {}

  _loadRecipient = createEffect(() =>
    this.action$.pipe(
      ofType(loadRecipient),
      exhaustMap((action) => {
        return this.recipientService.getRecipientList(action.bloodbankId).pipe(
          map((data) => {
            return loadRecipientSuccess({ list: data });
          }),
          catchError((_err) =>
            of(loadRecipientFail({ errormessage: _err.message }))
          )
        );
      })
    )
  );

  _addRecipient = createEffect(() =>
    this.action$.pipe(
      ofType(addRecipient),
      switchMap((action) => {
        return this.recipientService
          .addRecipientFromRemote(action.inputData)
          .pipe(
            switchMap((data) => {
              return of(
                addRecipientSuccess({ inputData: action.inputData }),
                showAlert({
                  message: 'recipient added successfully',
                  resptype: 'pass',
                })
              );
            }),
            catchError((_err) =>
              of(showAlert({ message: 'recipient add fail', resptype: 'fail' }))
            )
          );
      })
    )
  );

  _updateRecipient = createEffect(() =>
    this.action$.pipe(
      ofType(updateRecipient),
      switchMap((action) => {
        return this.recipientService.updateRecipient(action.inputData).pipe(
          switchMap((data) => {
            return of(
              updateRecipientSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'recipient updated successfully',
                resptype: 'pass',
              })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({ message: 'recipient updated fail', resptype: 'fail' })
            )
          )
        );
      })
    )
  );

  _deleteRecipient = createEffect(() =>
    this.action$.pipe(
      ofType(deleteRecipient),
      switchMap((action) => {
        return this.recipientService.deleteRecipient(action.recipientId).pipe(
          switchMap((data) => {
            return of(
              deleteRecipientSuccess({ recipientId: action.recipientId }),
              showAlert({
                message: 'recipient removed successfully',
                resptype: 'pass',
              })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({ message: `recipient remove fail`, resptype: 'fail' })
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
