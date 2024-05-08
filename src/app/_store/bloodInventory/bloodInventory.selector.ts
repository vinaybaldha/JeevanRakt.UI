import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InventoryModel } from '../../models/Blood';

const getInventoryState = createFeatureSelector<InventoryModel>('inventory');

export const getBloodInventory = createSelector(getInventoryState, (state) => {
  return state.inventory;
});

export const getSpinnerState = createSelector(getInventoryState, (state) => {
  return state.isLoaded;
});
