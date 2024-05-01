import { EntityState } from "@ngrx/entity";

export class Employee {
  employeeName: string = '';
  email: string = '';
  phoneNumber: string = '';
  password: string = '';
  confirmPassword: string = '';
  token: string = '';
  filePath: string = '';
  role:string = ''
  constructor() {}
}

export interface UserModel extends EntityState<Employee>{
  isDuplicate:boolean
  menuList: RoleAccess[]
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
  role: string
}

export interface Roles{
  code:string
  name:string
}

export interface Menus{
  code:string
  name:string
}

export interface RoleAccess{
  role:string
  menu:string
}
