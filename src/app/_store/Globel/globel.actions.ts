import { createAction, props } from '@ngrx/store';

export const LOAD_SPINNER = '[globel] load spinner';
export const CHECK_OUT = '[globel] check out';
export const CHECK_OUT_SUCCESS = '[globel] check out success';

export const loadSpinner = createAction(
  LOAD_SPINNER,
  props<{ isLoaded: boolean }>()
);

export const checkOut = createAction(CHECK_OUT, props<{ id: string }>());
export const checkOutSuccess = createAction(
  CHECK_OUT_SUCCESS,
  props<{ url: string }>()
);
