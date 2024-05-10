import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from '../../models/Employee';
import { UserAdaptor } from './user.state';

const getUserState = createFeatureSelector<UserModel>('user');

const userSelector = UserAdaptor.getSelectors();

export const isDuplicateUser = createSelector(
  getUserState,
  (state) => state.isDuplicate
);

export const getMenuByRole = createSelector(
  getUserState,
  (state) => state.menuList
);

export const getuserlist = createSelector(getUserState, userSelector.selectAll);
