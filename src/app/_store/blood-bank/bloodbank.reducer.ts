import { createReducer, on } from '@ngrx/store';
import { loadBloodBankFail, loadBloodBankSuccess } from './bloodbank.actions';
import { bloodbankState } from './bloodbank.state';

const _BloodBankReducer = createReducer(
  bloodbankState,
  on(loadBloodBankSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errormessage: '',
    };
  }),
  on(loadBloodBankFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  })
);

export function BloodBankReducer(state: any, action: any) {
  return _BloodBankReducer(state, action);
}