import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModel } from "../../models/Employee";

const getUserState = createFeatureSelector<UserModel>('user')

export const isDuplicateUser = createSelector(getUserState,state=>state.isDuplicate)

export const getMenuByRole = createSelector(getUserState,state=>state.menuList)