import { createReducer, on } from '@ngrx/store';
import { addRecipientSuccess, deleteRecipientSuccess, loadRecipientFail, loadRecipientSuccess, updateRecipientSuccess } from './reipient.actions';
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
  }),

  on(deleteRecipientSuccess,(state,action)=>{
    let _newdata = state.list.filter(o=>o.recipientId!=action.recipientId)
    return {
        ...state,
        list: _newdata,
        errormessage: ''
    }
}),
on(addRecipientSuccess,(state,action)=>{
    
    return {
        ...state,
        list: [...state.list, action.inputData],
        errormessage: ''
    }
}),
on(updateRecipientSuccess, (state, action) => {
    const updatedIndex = state.list.findIndex(donor => donor.recipientId === action.inputData.recipientId);
    if (updatedIndex !== -1) {
        const updatedList = [...state.list];
        updatedList[updatedIndex] = action.inputData;
        return {
            ...state,
            list: updatedList,
            errorMessage: ''
        };
    }
    return state;
})
);

export function RecipientReducer(state: any, action: any) {
  return _RecipientReducer(state, action);
}
