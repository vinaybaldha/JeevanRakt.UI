import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  checkOut,
  checkOutSuccess,
  loadSpinner,
} from '../Globel/globel.actions';
import { Injectable } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { catchError, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaderResponse } from '@angular/common/http';

@Injectable()
export class GlobelEffects {
  constructor(
    private action$: Actions,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  _checkout = createEffect(() =>
    this.action$.pipe(
      ofType(checkOut),
      switchMap((action) => {
        return this.checkoutService.checkOut(action.id).pipe(
          switchMap((data) => {
            window.location.href = data.url;

            return of(
              checkOutSuccess({ url: data.url }),
              loadSpinner({ isLoaded: false })
            );
          }),
          catchError((_err) => of(loadSpinner({ isLoaded: false })))
        );
      })
    )
  );
}
