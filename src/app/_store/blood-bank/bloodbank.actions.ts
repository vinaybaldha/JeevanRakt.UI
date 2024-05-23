import { createAction, props } from '@ngrx/store';
import { BloodBank } from '../../models/BloodBank';
import { Filter } from '../../models/Filter';

export const LOAD_BLOODBANK = '[bloodbank] load bloodbank';
export const LOAD_BLOODBANK_SUCCESS = '[bloodbank] load bloodbank success';
export const LOAD_BLOODBANK_FAIL = '[bloodbank] load bloodbank fail';

export const LOAD_BLOODBANK_BY_ID = '[bloodbank] load bloodbank by id';
export const LOAD_BLOODBANK_BY_ID_SUCC =
  '[bloodbank] load bloodbank by id success';

export const ADD_BLOODBANK = '[bloodbank] add bloodbank';
export const ADD_BLOODBANK_SUCCESS = '[bloodbank] add bloodbank success';

export const UPDATE_BLOODBANK = '[bloodbank] update bloodbank';
export const UPDATE_BLOODBANK_SUCCESS = '[bloodbank] update bloodbank success';

export const DELETE_BLOODBANK = '[bloodbank] delete bloodbank';
export const DELETE_BLOODBANK_SUCCESS = '[bloodbank] delete bloodbank success';

export const SHOW_ALERT = '[bloodbank] show alert';

export const loadBloodBank = createAction(
  LOAD_BLOODBANK,
  props<{ filter: Filter }>()
);
export const loadBloodBankSuccess = createAction(
  LOAD_BLOODBANK_SUCCESS,
  props<{ list: BloodBank[]; pages: number }>()
);
export const loadBloodBankFail = createAction(
  LOAD_BLOODBANK_FAIL,
  props<{ errormessage: string }>()
);

export const loadBloodBankById = createAction(
  LOAD_BLOODBANK_BY_ID,
  props<{ id: string }>()
);
export const loadBloodBankByIdSuccess = createAction(
  LOAD_BLOODBANK_BY_ID_SUCC,
  props<{ bloodbank: BloodBank }>()
);

export const addBloodBank = createAction(
  ADD_BLOODBANK,
  props<{ inputData: BloodBank }>()
);
export const addBloodBankSuccess = createAction(
  ADD_BLOODBANK_SUCCESS,
  props<{ inputData: BloodBank }>()
);

export const updateBloodBank = createAction(
  UPDATE_BLOODBANK,
  props<{ inputData: BloodBank }>()
);
export const updateBloodBankSuccess = createAction(
  UPDATE_BLOODBANK_SUCCESS,
  props<{ inputData: BloodBank }>()
);

export const deleteBloodBank = createAction(
  DELETE_BLOODBANK,
  props<{ bloodbankId: string }>()
);
export const deleteBloodBankSuccess = createAction(
  DELETE_BLOODBANK_SUCCESS,
  props<{ bloodbankId: string }>()
);

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resptype: string }>()
);
export const emptyAction = createAction('emptyAction');
