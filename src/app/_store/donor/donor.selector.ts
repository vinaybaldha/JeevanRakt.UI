import { createFeatureSelector, createSelector } from "@ngrx/store";
import { DonorModel } from "../../models/donor";

const getDonorState = createFeatureSelector<DonorModel>('donor')

export const getDonorList = createSelector(getDonorState, (state)=>{
    return state.list
})

export const getSpinnerState = createSelector(getDonorState, (state)=>{
    return state.isLoaded
})