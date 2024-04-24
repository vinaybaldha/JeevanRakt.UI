import { createReducer, on } from "@ngrx/store";
import { donorState } from "./donor.state";
import { loadDonorFail, loadDonorSuccess } from "./donor.actions";

const _DonorReducer = createReducer(donorState,
    on(loadDonorSuccess, (state,action)=>{
        return {
            ...state,
            list: action.list,
            errormessage:''
        }
    }),
    on(loadDonorFail,(state,action)=>{
        return {
            ...state,
            list:[],
            errormessage:action.errormessage
        }
    })
)

export function DonorReducer(state:any,action:any){
    return _DonorReducer(state,action)
}