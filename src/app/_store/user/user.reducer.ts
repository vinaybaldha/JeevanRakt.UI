import { createReducer, on} from "@ngrx/store";
import { userState } from "./user.state";
import { duplicateUserSuccess, fetchMenuSuccess } from "./user.actions";

const _UserReducer = createReducer(userState,
    on(duplicateUserSuccess, (state,action)=>{
        return {
            ...state,
            isDuplicate:action.isDuplicate
        }
    }),
    on(fetchMenuSuccess, (state,action)=>{
        return {
            ...state,
            menuList: action.menulist
        }
    }),
)

export function UserReducer(state:any,action:any){
    return _UserReducer(state,action)
}