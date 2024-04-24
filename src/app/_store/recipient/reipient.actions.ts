import { createAction, props } from "@ngrx/store"
import { Recipient } from "../../models/Recipient"

export const LOAD_RECIPIENT = '[recipient] load recipient'
export const LOAD_RECIPIENT_SUCCESS = '[recipient] load recipient success'
export const LOAD_RECIPIENT_FAIL = '[recipient] load recipient fail'

export const loadRecipient = createAction(LOAD_RECIPIENT)
export const loadRecipientSuccess = createAction(LOAD_RECIPIENT_SUCCESS,props<{list:Recipient[]}>())
export const loadRecipientFail = createAction(LOAD_RECIPIENT_FAIL,props<{errormessage:string}>())
