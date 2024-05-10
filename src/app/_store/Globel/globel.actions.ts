import { createAction, props } from '@ngrx/store';

export const LOAD_SPINNER = '[donor] load spinner';

export const loadSpinner = createAction(
  LOAD_SPINNER,
  props<{ isLoaded: boolean }>()
);
