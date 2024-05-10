import { createReducer, on } from '@ngrx/store';
import { globelState } from './globel.state';
import { loadSpinner } from './globel.actions';

const _GlobelReducer = createReducer(
  globelState,
  on(loadSpinner, (state, action) => {
    return {
      ...state,
      isLoaded: action.isLoaded,
    };
  })
);

export function GlobelReducer(state: any, action: any) {
  return _GlobelReducer(state, action);
}
