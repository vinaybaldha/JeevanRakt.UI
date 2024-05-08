import { createAction, props } from '@ngrx/store';
import { Donor } from '../../models/donor';

export const LOAD_DONOR = '[donor] load donor';
export const LOAD_DONOR_SUCCESS = '[donor] load donor success';
export const LOAD_DONOR_FAIL = '[donor] load donor fail';

export const ADD_DONOR = '[donor] add donor';
export const ADD_DONOR_SUCCESS = '[donor] add donor success';

export const UPDATE_DONOR = '[donor] update donor';
export const UPDATE_DONOR_SUCCESS = '[donor] update donor success';

export const DELETE_DONOR = '[donor] delete donor';
export const DELETE_DONOR_SUCCESS = '[donor] delete donor success';

export const LOAD_SPINNER = '[donor] load spinner';

export const SHOW_ALERT = '[donor] show alert';

export const loadDonor = createAction(
  LOAD_DONOR,
  props<{ bloodbankId: string }>()
);
export const loadDonorSuccess = createAction(
  LOAD_DONOR_SUCCESS,
  props<{ list: Donor[] }>()
);
export const loadDonorFail = createAction(
  LOAD_DONOR_FAIL,
  props<{ errormessage: string }>()
);

export const addDonor = createAction(ADD_DONOR, props<{ inputData: Donor }>());
export const addDonorSuccess = createAction(
  ADD_DONOR_SUCCESS,
  props<{ inputData: Donor }>()
);

export const updateDonor = createAction(
  UPDATE_DONOR,
  props<{ inputData: Donor }>()
);
export const updateDonorSuccess = createAction(
  UPDATE_DONOR_SUCCESS,
  props<{ inputData: Donor }>()
);

export const deleteDonor = createAction(
  DELETE_DONOR,
  props<{ donorId: string }>()
);
export const deleteDonorSuccess = createAction(
  DELETE_DONOR_SUCCESS,
  props<{ donorId: string }>()
);

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resptype: string }>()
);
export const emptyAction = createAction('emptyAction');

export const loadSpinner = createAction(
  LOAD_SPINNER,
  props<{ isLoaded: boolean }>()
);
