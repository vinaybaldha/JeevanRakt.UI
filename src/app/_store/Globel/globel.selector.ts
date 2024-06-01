import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GlobelModel } from './globel.model';

const getGlobelState = createFeatureSelector<GlobelModel>('globel');

export const getSpinnerState = createSelector(getGlobelState, (state) => {
  return state.isLoaded;
});

export const getUrl = createSelector(getGlobelState, (state) => {
  return state.url;
});

export const getNotificationList = createSelector(getGlobelState, (state) => {
  return state.notificationlist;
});
