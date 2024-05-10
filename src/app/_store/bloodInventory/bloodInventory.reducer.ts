import { createReducer, on } from '@ngrx/store';
import {
  addInventorySuccess,
  deleteInventorySuccess,
  loadInventoryFail,
  loadInventorySuccess,
  updateInventorySuccess,
} from './bloodInventory.actions';
import { BloodInventory, InventoryModel } from '../../models/Blood';
import { inventoryState } from './bloodInventory.state';

const _BloodInventoryReducer = createReducer(
  inventoryState,
  on(deleteInventorySuccess, (state: InventoryModel) => {
    return {
      ...state,
      inventory: new BloodInventory(),
      errormessage: '',
      isLoaded: false,
    };
  }),
  on(addInventorySuccess, (state, action) => {
    return {
      ...state,
      inventory: action.inputData,
      errormessage: '',
      isLoaded: false,
    };
  }),
  on(updateInventorySuccess, (state, action) => {
    return {
      ...state,
      inventory: action.inputData,
      errorMessage: '',
      isLoaded: false,
    };
  }),
  on(loadInventorySuccess, (state, action) => {
    return {
      ...state,
      inventory: action.inventory,
      errormessage: '',
      isLoaded: false,
    };
  }),
  on(loadInventoryFail, (state, action) => {
    return {
      ...state,
      inventory: new BloodInventory(),
      errormessage: action.errormessage,
      isLoaded: false,
    };
  })
);

export function BloodInventoryReducer(state: any, action: any) {
  return _BloodInventoryReducer(state, action);
}
