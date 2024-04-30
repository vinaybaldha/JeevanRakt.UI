import { EntityState } from "@ngrx/entity";

export class Employee {
  employeeName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  token: string = '';
  filePath: string = '';
  constructor() {}
}

export interface UserModel extends EntityState<Employee>{
  isDuplicate:boolean
}

export interface usercred{
  email: string 
  password: string 
}
export interface userinfo{
  employeeName: string
  email: string 
  phoneNumber: string
  token: string 
  filePath: string 
}
