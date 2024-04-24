import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { BloodBankService } from '../../services/blood-bank.service';
import { loadBloodBank, loadBloodBankFail, loadBloodBankSuccess } from './bloodbank.actions';

@Injectable()
export class BloodBankEffects {
  constructor(
    private action$: Actions,
    private bloodbankService: BloodBankService
  ) {}

  _loadRecipient = createEffect(() =>
    this.action$.pipe(
      ofType(loadBloodBank),
      exhaustMap((action) => {
        return this.bloodbankService.getBloodBanks().pipe(
          map((data) => {
            return loadBloodBankSuccess({ list: data });
          }),
          catchError((_err) =>
            of(loadBloodBankFail({ errormessage: _err.message }))
          )
        );
      })
    )
  );
}
