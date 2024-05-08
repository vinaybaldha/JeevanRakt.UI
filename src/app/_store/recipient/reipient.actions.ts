import { createAction, props } from '@ngrx/store';
import { Recipient } from '../../models/Recipient';

export const LOAD_RECIPIENT = '[recipient] load recipient';
export const LOAD_RECIPIENT_SUCCESS = '[recipient] load recipient success';
export const LOAD_RECIPIENT_FAIL = '[recipient] load recipient fail';

export const ADD_RECIPIENT = '[recipient] add recipient';
export const ADD_RECIPIENT_SUCCESS = '[recipient] add recipient success';

export const UPDATE_RECIPIENT = '[recipient] update recipient';
export const UPDATE_RECIPIENT_SUCCESS = '[recipient] update recipient success';

export const DELETE_RECIPIENT = '[recipient] delete recipient';
export const DELETE_RECIPIENT_SUCCESS = '[recipient] delete recipient success';

export const SHOW_ALERT = '[recipient] show alert';

export const loadRecipient = createAction(
  LOAD_RECIPIENT,
  props<{ bloodbankId: string }>()
);
export const loadRecipientSuccess = createAction(
  LOAD_RECIPIENT_SUCCESS,
  props<{ list: Recipient[] }>()
);
export const loadRecipientFail = createAction(
  LOAD_RECIPIENT_FAIL,
  props<{ errormessage: string }>()
);

export const addRecipient = createAction(
  ADD_RECIPIENT,
  props<{ inputData: Recipient }>()
);
export const addRecipientSuccess = createAction(
  ADD_RECIPIENT_SUCCESS,
  props<{ inputData: Recipient }>()
);

export const updateRecipient = createAction(
  UPDATE_RECIPIENT,
  props<{ inputData: Recipient }>()
);
export const updateRecipientSuccess = createAction(
  UPDATE_RECIPIENT_SUCCESS,
  props<{ inputData: Recipient }>()
);

export const deleteRecipient = createAction(
  DELETE_RECIPIENT,
  props<{ recipientId: string }>()
);
export const deleteRecipientSuccess = createAction(
  DELETE_RECIPIENT_SUCCESS,
  props<{ recipientId: string }>()
);

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resptype: string }>()
);
export const emptyAction = createAction('emptyAction');
