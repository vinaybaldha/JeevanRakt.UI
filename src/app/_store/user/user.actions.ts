import { createAction, props } from '@ngrx/store';
import { Employee, RoleAccess, usercred } from '../../models/Employee';

export const BEGIN_REGISTER = '[auth] begin register';
export const BEGIN_LOGIN = '[auth] begin login';
export const DUPLICATE_USER = '[auth] duplicate user';
export const DUPLICATE_USER_SUCC = '[auth] duplicate user success';
export const FETCH_MENU = '[auth] fetch menu';
export const FETCH_MENU_SUCC = '[auth] fetch menu success';
export const GET_USERS = '[auth] get users';
export const GET_USER_SUCC = '[auth] get user success';

export const SHOW_ALERT = '[auth] show alert';

export const beginRegister = createAction(
  BEGIN_REGISTER,
  props<{ userdata: Employee }>()
);
export const beginLogin = createAction(
  BEGIN_LOGIN,
  props<{ userdata: usercred }>()
);
export const duplicateUser = createAction(
  DUPLICATE_USER,
  props<{ username: string }>()
);
export const duplicateUserSuccess = createAction(
  DUPLICATE_USER_SUCC,
  props<{ isDuplicate: boolean }>()
);
export const fetchMenu = createAction(
  FETCH_MENU,
  props<{ userrole: string }>()
);
export const fetchMenuSuccess = createAction(
  FETCH_MENU_SUCC,
  props<{ menulist: RoleAccess[] }>()
);
export const getUser = createAction(GET_USERS);
export const getUserSuccess = createAction(
  GET_USER_SUCC,
  props<{ userlist: Employee[] }>()
);

export const showAlert = createAction(
  SHOW_ALERT,
  props<{ message: string; resptype: string }>()
);
export const emptyAction = createAction('emptyAction');
