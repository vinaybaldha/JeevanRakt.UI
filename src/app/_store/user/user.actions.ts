import { createAction, props } from "@ngrx/store"
import { Employee, usercred } from "../../models/Employee"


export const BEGIN_REGISTER = '[auth] begin register'
export const BEGIN_LOGIN = '[auth] begin login'
export const DUPLICATE_USER = '[auth] duplicate user'
export const DUPLICATE_USER_SUCC = '[auth] duplicate user success'

export const LOAD_SPINNER = '[auth] load spinner'
export const SHOW_ALERT = '[auth] show alert'

export const beginRegister = createAction(BEGIN_REGISTER, props<{userdata: Employee}>())
export const beginLogin = createAction(BEGIN_LOGIN, props<{userdata: usercred}>())
export const duplicateUser = createAction(DUPLICATE_USER, props<{username: string}>())
export const duplicateUserSuccess = createAction(DUPLICATE_USER_SUCC, props<{isDuplicate: boolean}>())

export const showAlert = createAction(SHOW_ALERT, props<{message:string, resptype:string}>())
export const emptyAction = createAction('emptyAction')

export const loadSpinner = createAction(LOAD_SPINNER, props<{isLoaded:boolean}>())