import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BloodBankModel } from '../../models/BloodBank';

const getBloodBankState = createFeatureSelector<BloodBankModel>('bloodbank');

export const getBloodBankList = createSelector(getBloodBankState, (state) => {
  return state.list;
});

export const getBloodBank = createSelector(getBloodBankState, (state) => {
  return state.bloodbank;
});
