import { createReducer, on } from '@ngrx/store';
import { globelState } from './globel.state';
import {
  addNotification,
  checkOutSuccess,
  clearNotification,
  loadSpinner,
} from './globel.actions';

const _GlobelReducer = createReducer(
  globelState,
  on(loadSpinner, (state, action) => {
    return {
      ...state,
      isLoaded: action.isLoaded,
    };
  }),
  on(checkOutSuccess, (state, action) => {
    return {
      ...state,
      url: action.url,
    };
  }),
  on(addNotification, (state, action) => {
    return {
      ...state,
      notificationlist: [...state.notificationlist, action.notification],
    };
  }),
  on(clearNotification, (state, action) => {
    return {
      ...state,
      notificationlist: [],
    }
  })
);

export function GlobelReducer(state: any, action: any) {
  return _GlobelReducer(state, action);
}
