import { createReducer, on } from "@ngrx/store";
import { donorState } from "./donor.state";
import { addDonorSuccess, deleteDonorSuccess, loadDonorFail, loadDonorSuccess,  updateDonorSuccess } from "./donor.actions";

const _DonorReducer = createReducer(donorState,
    on(loadDonorSuccess, (state,action)=>{
        return {
            ...state,
            list: action.list,
            errormessage:'',
            isLoaded: false
        }
    }),
    on(loadDonorFail,(state,action)=>{
        return {
            ...state,
            list:[],
            errormessage:action.errormessage,
            isLoaded: false
        }
    }),
    on(deleteDonorSuccess,(state,action)=>{
        let _newdata = state.list.filter(o=>o.donorId!=action.donorId)
        return {
            ...state,
            list: _newdata,
            errormessage: '',
            isLoaded: false
        }
    }),
    on(addDonorSuccess,(state,action)=>{
        
        return {
            ...state,
            list: [...state.list, action.inputData],
            errormessage: '',
            isLoaded: false
        }
    }),
    on(updateDonorSuccess, (state, action) => {
        const updatedIndex = state.list.findIndex(donor => donor.donorId === action.inputData.donorId);
        if (updatedIndex !== -1) {
            const updatedList = [...state.list];
            updatedList[updatedIndex] = action.inputData;
            return {
                ...state,
                list: updatedList,
                errorMessage: '',
                isLoaded: false
            };
        }
        return state;
    }),
    
)

export function DonorReducer(state:any,action:any){
    return _DonorReducer(state,action)
}