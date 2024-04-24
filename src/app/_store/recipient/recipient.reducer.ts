import { createReducer, on } from '@ngrx/store';
import { loadRecipientFail, loadRecipientSuccess } from './reipient.actions';
import { recipientState } from './recipient.state';

const _RecipientReducer = createReducer(
  recipientState,
  on(loadRecipientSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
    };
  }),
  on(loadRecipientFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  })
);

export function RecipientReducer(state: any, action: any) {
  return _RecipientReducer(state, action);
}
