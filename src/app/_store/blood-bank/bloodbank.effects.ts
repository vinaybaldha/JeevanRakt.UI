import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BloodBankService } from '../../services/blood-bank.service';
import {
  addBloodBank,
  addBloodBankSuccess,
  approveBloodBankRequest,
  approveBloodBankRequestSuccess,
  deleteBloodBank,
  deleteBloodBankSuccess,
  emptyAction,
  loadBloodBank,
  loadBloodBankById,
  loadBloodBankByIdSuccess,
  loadBloodBankFail,
  loadBloodBankSuccess,
  loadPendingBloodBank,
  loadPendingBloodBankFail,
  loadPendingBloodBankSuccess,
  showAlert,
  updateBloodBank,
  updateBloodBankSuccess,
} from './bloodbank.actions';
import { loadInventory } from '../bloodInventory/bloodInventory.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { loadSpinner } from '../Globel/globel.actions';
import { BloodBank } from '../../models/BloodBank';

@Injectable()
export class BloodBankEffects {
  constructor(
    private action$: Actions,
    private bloodbankService: BloodBankService,
    private _snackbar: MatSnackBar
  ) {}

  _loadBloodBank = createEffect(() =>
    this.action$.pipe(
      ofType(loadBloodBank),
      switchMap((action) => {
        return this.bloodbankService.getBloodBanks(action.filter).pipe(
          switchMap((data) => {
            return of(
              loadBloodBankSuccess({
                list: data.bloodBanks,
                pages: data.pages,
              }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              loadBloodBankFail({ errormessage: _err.message }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _loadPendingBloodBank = createEffect(() =>
    this.action$.pipe(
      ofType(loadPendingBloodBank),
      switchMap((action) => {
        return this.bloodbankService.getPendingBloodBanks().pipe(
          switchMap((data) => {
            return of(
              loadPendingBloodBankSuccess({
                list: data,
              }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              loadPendingBloodBankFail({ errormessage: _err.message }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _loadBloodBankById = createEffect(() =>
    this.action$.pipe(
      ofType(loadBloodBankById),
      switchMap((action) => {
        return this.bloodbankService.getBloodBankById(action.id).pipe(
          switchMap((data) => {
            return of(
              loadBloodBankByIdSuccess({ bloodbank: data }),
              loadInventory({
                inventoryId: data.bloodInventory.bloodInventoryId,
              }),
              loadSpinner({ isLoaded: false })
            );
          })
        );
      })
    )
  );

  _addBloodBank = createEffect(() =>
    this.action$.pipe(
      ofType(addBloodBank),
      switchMap((action) => {
        return this.bloodbankService.addBloodBank(action.inputData).pipe(
          switchMap((data) => {
            return of(
              addBloodBankSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'bloodbank added successfully',
                resptype: 'pass',
              }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({ message: 'bloodbank add fail', resptype: 'fail' }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _updateDonor = createEffect(() =>
    this.action$.pipe(
      ofType(updateBloodBank),
      switchMap((action) => {
        return this.bloodbankService.updateBloodBank(action.inputData).pipe(
          switchMap((data) => {
            return of(
              updateBloodBankSuccess({ inputData: action.inputData }),
              showAlert({
                message: 'bloodbank updated successfully',
                resptype: 'pass',
              }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) =>
            of(
              showAlert({ message: 'bloodbank update fail', resptype: 'fail' }),
              loadSpinner({ isLoaded: false })
            )
          )
        );
      })
    )
  );

  _deleteDonor = createEffect(() =>
    this.action$.pipe(
      ofType(deleteBloodBank),
      switchMap((action) => {
        return this.bloodbankService.deleteBloodBank(action.bloodbankId).pipe(
          switchMap((data) => {
            return of(
              deleteBloodBankSuccess({ bloodbankId: action.bloodbankId }),
              showAlert({
                message: 'bloodbank removed successfully',
                resptype: 'pass',
              }),
              loadSpinner({ isLoaded: false })
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

  _approveBloodRequest = createEffect(() =>
    this.action$.pipe(
      ofType(approveBloodBankRequest),
      switchMap((action) => {
        return this.bloodbankService
          .approveBloodBankRequest(action.bloodbankId)
          .pipe(
            switchMap((data) => {
              return of(
                approveBloodBankRequestSuccess({
                  bloodbankId: action.bloodbankId,
                }),
                showAlert({
                  message: 'bloodbank request approved successfully.',
                  resptype: 'pass',
                }),
                loadSpinner({ isLoaded: false })
              );
            }),
            catchError((_err) =>
              of(
                showAlert({
                  message: `approve request fail.`,
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
