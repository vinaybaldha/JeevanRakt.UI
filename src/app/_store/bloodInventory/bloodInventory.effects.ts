import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  addInventory,
  addInventorySuccess,
  deleteInventory,
  deleteInventorySuccess,
  emptyAction,
  loadInventory,
  loadInventoryFail,
  loadInventorySuccess,
  loadSpinner,
  showAlert,
  updateInventory,
  updateInventorySuccess,
} from './bloodInventory.actions';
import { BloodInventoryService } from '../../services/blood-inventory.service';
import { AccountService } from '../../services/account.service';

@Injectable()
export class BloodInventoryEffects {
  constructor(
    private action$: Actions,
    private bloodInventoryService: BloodInventoryService,
    private _snackbar: MatSnackBar,
    private authService: AccountService
  ) {}

  _loadInventory = createEffect(() =>
    this.action$.pipe(
      ofType(loadInventory),
      exhaustMap((action) => {
        return this.bloodInventoryService
          .getBloodINventoryById(action.inventoryId)
          .pipe(
            map((data) => {
              this.authService.setInventoryIdToLocalStorage(
                data.bloodInventoryId
              );
              return loadInventorySuccess({ inventory: data });
            }),
            catchError((_err) =>
              of(
                loadInventoryFail({ errormessage: _err.message }),
                loadSpinner({ isLoaded: false })
              )
            )
          );
      })
    )
  );

  _addInventory = createEffect(() =>
    this.action$.pipe(
      ofType(addInventory),
      switchMap((action) => {
        return this.bloodInventoryService
          .addBloodInventory(action.inputData)
          .pipe(
            switchMap((data) => {
              return of(
                addInventorySuccess({ inputData: data }),
                showAlert({
                  message: 'BloodInventory added successfully',
                  resptype: 'pass',
                })
              );
            }),
            catchError((_err) =>
              of(
                showAlert({ message: 'add inventory fail', resptype: 'fail' }),
                loadSpinner({ isLoaded: false })
              )
            )
          );
      })
    )
  );

  _updateInventory = createEffect(() =>
    this.action$.pipe(
      ofType(updateInventory),
      switchMap((action) => {
        return this.bloodInventoryService
          .updateBloodInventory(action.inputData)
          .pipe(
            switchMap(() => {
              return of(
                updateInventorySuccess({ inputData: action.inputData }),
                showAlert({ message: 'blood stock updated', resptype: 'pass' })
              );
            }),
            catchError((_err) =>
              of(
                showAlert({
                  message: 'blood stock update fail',
                  resptype: 'fail',
                }),
                loadSpinner({ isLoaded: false })
              )
            )
          );
      })
    )
  );

  _deleteInventory = createEffect(() =>
    this.action$.pipe(
      ofType(deleteInventory),
      switchMap((action) => {
        return this.bloodInventoryService
          .deleteBloodInventory(action.inventoryId)
          .pipe(
            switchMap(() => {
              return of(
                deleteInventorySuccess({ inventoryId: action.inventoryId }),
                showAlert({
                  message: 'inventory removed successfully',
                  resptype: 'pass',
                })
              );
            }),
            catchError((_err) =>
              of(
                showAlert({
                  message: `inventory remove fail`,
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
