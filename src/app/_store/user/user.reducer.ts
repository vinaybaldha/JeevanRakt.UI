import { createReducer, on } from '@ngrx/store';
import { UserAdaptor, userState } from './user.state';
import {
  duplicateUserSuccess,
  fetchMenuSuccess,
  getUserSuccess,
  uploadImageSuccess,
} from './user.actions';

const _UserReducer = createReducer(
  userState,
  on(duplicateUserSuccess, (state, action) => {
    return {
      ...state,
      isDuplicate: action.isDuplicate,
      isLoaded: false,
    };
  }),
  on(fetchMenuSuccess, (state, action) => {
    return {
      ...state,
      menuList: action.menulist,
      isLoaded: false,
    };
  }),
  on(getUserSuccess, (state, action) => {
    return UserAdaptor.setAll(action.userlist, state);
  })
);

export function UserReducer(state: any, action: any) {
  return _UserReducer(state, action);
}
