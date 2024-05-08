import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { BloodBankService } from '../../services/blood-bank.service';
import {
  loadBloodBank,
  loadBloodBankById,
  loadBloodBankByIdSuccess,
  loadBloodBankFail,
  loadBloodBankSuccess,
} from './bloodbank.actions';
import { loadInventory } from '../bloodInventory/bloodInventory.actions';

@Injectable()
export class BloodBankEffects {
  constructor(
    private action$: Actions,
    private bloodbankService: BloodBankService
  ) {}

  _loadBloodBank = createEffect(() =>
    this.action$.pipe(
      ofType(loadBloodBank),
      switchMap((action) => {
        return this.bloodbankService.getBloodBanks().pipe(
          switchMap((data) => {
            return of(loadBloodBankSuccess({ list: data }));
          }),
          catchError((_err) =>
            of(loadBloodBankFail({ errormessage: _err.message }))
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
              })
            );
          })
        );
      })
    )
  );
}
