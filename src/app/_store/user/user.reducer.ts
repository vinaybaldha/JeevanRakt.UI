import { createReducer, on} from "@ngrx/store";
import { userState } from "./user.state";
import { duplicateUserSuccess } from "./user.actions";

const _UserReducer = createReducer(userState,
    on(duplicateUserSuccess, (state,action)=>{
        return {
            ...state,
            isDuplicate:action.isDuplicate
        }
    }),
)

export function UserReducer(state:any,action:any){
    return _UserReducer(state,action)
}