import { createEntityAdapter } from '@ngrx/entity';
import { Employee, UserModel } from '../../models/Employee';

export const UserAdaptor = createEntityAdapter<Employee>();

export const userState: UserModel = UserAdaptor.getInitialState({
  isDuplicate: false,
  menuList: [],
});
