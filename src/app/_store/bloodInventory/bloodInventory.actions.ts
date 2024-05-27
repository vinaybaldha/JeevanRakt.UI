import { createAction, props } from '@ngrx/store';
import { BloodInventory } from '../../models/Blood';

export const LOAD_INVENTORY = '[inventory] load inventory';
export const LOAD_INVENTORY_SUCCESS = '[inventory] load inventory success';
export const LOAD_INVENTORY_FAIL = '[inventory] load inventory fail';

export const ADD_INVENTORY = '[inventory] add inventory';
export const ADD_INVENTORY_SUCCESS = '[inventory] add inventory success';

export const UPDATE_INVENTORY = '[inventory] update inventory';
export const UPDATE_INVENTORY_SUCCESS = '[inventory] update inventory success';

export const DELETE_INVENTORY = '[inventory] delete inventory';
export const DELETE_INVENTORY_SUCCESS = '[inventory] delete inventory success';

export const SHOW_ALERT = '[inventory] show alert';

export const addInventory = createAction(
  ADD_INVENTORY,
  props<{ inputData: BloodInventory }>()
);
export const addInventorySuccess = createAction(
  ADD_INVENTORY_SUCCESS,
  props<{ inputData: BloodInventory }>()
);

export const updateInventory = createAction(
  UPDATE_INVENTORY,
  props<{ inputData: BloodInventory; recipientId?: string; donorId?: string }>()
);
export const updateInventorySuccess = createAction(
  UPDATE_INVENTORY_SUCCESS,
  props<{ inputData: BloodInventory }>()
);

export const deleteInventory = createAction(
  DELETE_INVENTORY,
  props<{ inventoryId: string }>()
);
export const deleteInventorySuccess = createAction(
  DELETE_INVENTORY_SUCCESS,
  props<{ inventoryId: string }>()
);

export const loadInventory = createAction(
  LOAD_INVENTORY,
  props<{ inventoryId: string }>()
);
export const loadInventorySuccess = createAction(
  LOAD_INVENTORY_SUCCESS,
  props<{ inventory: BloodInventory }>()
);
export const loadInventoryFail = createAction(
  LOAD_INVENTORY_FAIL,
  props<{ errormessage: string }>()
);

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resptype: string }>()
);
export const emptyAction = createAction('emptyAction');
