import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { RecipientService } from '../../services/recipient.service';
import { loadRecipient, loadRecipientFail, loadRecipientSuccess } from './reipient.actions';

@Injectable()
export class RecipientEffects {
  constructor(private action$: Actions, private recipientService: RecipientService) {}

  _loadRecipient = createEffect(() =>
    this.action$.pipe(
      ofType(loadRecipient),
      exhaustMap((action) => {
        return this.recipientService.getRecipientList().pipe(
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
}
