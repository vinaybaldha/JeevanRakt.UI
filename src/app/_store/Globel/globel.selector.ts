import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobelModel } from './globel.model';

const getGlobelState = createFeatureSelector<GlobelModel>('globel');

export const getSpinnerState = createSelector(getGlobelState, (state) => {
  return state.isLoaded;
});
