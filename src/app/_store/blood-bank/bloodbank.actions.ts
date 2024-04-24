import { createAction, props } from "@ngrx/store"
import { BloodBank } from "../../models/BloodBank"

export const LOAD_BLOODBANK = '[bloodbank] load bloodbank'
export const LOAD_BLOODBANK_SUCCESS = '[bloodbank] load bloodbank success'
export const LOAD_BLOODBANK_FAIL = '[bloodbank] load bloodbank fail'

export const loadBloodBank = createAction(LOAD_BLOODBANK)
export const loadBloodBankSuccess = createAction(LOAD_BLOODBANK_SUCCESS,props<{list:BloodBank[]}>())
export const loadBloodBankFail = createAction(LOAD_BLOODBANK_FAIL,props<{errormessage:string}>())
