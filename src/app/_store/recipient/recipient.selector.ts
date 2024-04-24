import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RecipientModel } from "../../models/Recipient";

const getRecipientState = createFeatureSelector<RecipientModel>('recipient')

export const getRecipientList = createSelector(getRecipientState, (state)=>{
    return state.list
})