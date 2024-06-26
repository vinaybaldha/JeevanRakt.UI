import { createReducer, on } from '@ngrx/store';
import {
  addBloodBankSuccess,
  approveBloodBankRequestSuccess,
  deleteBloodBankSuccess,
  loadBloodBankByIdSuccess,
  loadBloodBankFail,
  loadBloodBankSuccess,
  loadPendingBloodBank,
  loadPendingBloodBankSuccess,
  updateBloodBankSuccess,
} from './bloodbank.actions';
import { bloodbankState } from './bloodbank.state';
import { BloodBank } from '../../models/BloodBank';

const _BloodBankReducer = createReducer(
  bloodbankState,
  on(loadBloodBankSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      pages: action.pages,
      errormessage: '',
    };
  }),
  on(loadPendingBloodBankSuccess, (state, action) => {
    return {
      ...state,
      pendingbloodbank: action.list,
      errormessage: '',
    };
  }),
  on(loadBloodBankByIdSuccess, (state, action) => {
    return {
      ...state,
      errormessage: '',
      bloodbank: action.bloodbank,
    };
  }),
  on(loadBloodBankFail, (state, action) => {
    return {
      ...state,
      list: [],
      errormessage: action.errormessage,
    };
  }),
  on(deleteBloodBankSuccess, (state, action) => {
    let _newdata = state.list.filter(
      (o) => o.bloodBankId != action.bloodbankId
    );
    return {
      ...state,
      list: _newdata,
      errormessage: '',
      isLoaded: false,
      bloodbank: new BloodBank(),
    };
  }),
  on(addBloodBankSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputData],
      errormessage: '',
      isLoaded: false,
      bloodbank: action.inputData,
    };
  }),
  on(updateBloodBankSuccess, (state, action) => {
    const updatedIndex = state.list.findIndex(
      (bloodbank) => bloodbank.bloodBankId === action.inputData.bloodBankId
    );
    if (updatedIndex !== -1) {
      const updatedList = [...state.list];
      updatedList[updatedIndex] = action.inputData;
      return {
        ...state,
        list: updatedList,
        errorMessage: '',
        isLoaded: false,
        bloodbank: action.inputData,
      };
    }
    return state;
  }),
  on(approveBloodBankRequestSuccess, (state, action) => {
    let _newdata = state.pendingbloodbank.filter(
      (o) => o.bloodBankId != action.bloodbankId
    );
    return {
      ...state,
      pendingbloodbank: _newdata,
      errormessage: '',
      isLoaded: false,
    };
  })
);

export function BloodBankReducer(state: any, action: any) {
  return _BloodBankReducer(state, action);
}
