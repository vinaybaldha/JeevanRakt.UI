import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, switchMap} from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountService } from "../../services/account.service";
import { beginLogin, beginRegister, duplicateUser, duplicateUserSuccess, emptyAction, fetchMenu, fetchMenuSuccess, getUser, getUserSuccess, showAlert } from "./user.actions";
import { Router } from "@angular/router";

@Injectable()
export class UserEffects{
    constructor(private action$:Actions, private userService:AccountService, private _snackbar:MatSnackBar, private router: Router){}

    _userregister = createEffect(()=>
        this.action$.pipe(
            ofType(beginRegister),
            exhaustMap((action)=>{
                return this.userService.registerEmployee(action.userdata).pipe(
                    map((data)=>{
                        this.router.navigate(['login'])
                        return showAlert({message:'Registerd Successfully', resptype:'pass'})
                    }),
                    catchError((_err)=>of(showAlert({message:'Registration Fail due to: '+_err.message, resptype:'fail'})))
                )
            })
        )
    )

    _userlogin = createEffect(()=>
        this.action$.pipe(
            ofType(beginLogin),
            switchMap((action)=>{
                return this.userService.loginEmployee(action.userdata.email,action.userdata.password).pipe(
                    switchMap((data)=>{
                        this.userService.setUserToLocalStorage(data)
                        this.router.navigate([''])
                        return of(fetchMenu({userrole: data.role}),showAlert({message:'Login Successfully', resptype:'pass'}))
                    }),
                    catchError((_err)=>of(showAlert({message:'Login Fail due to: '+_err.message, resptype:'fail'})))
                )
            })
        )
    )

    _duplicateuser = createEffect(()=>
        this.action$.pipe(
            ofType(duplicateUser),
            switchMap((action)=>{
                return this.userService.duplicateUserName(action.username).pipe(
                    switchMap((data)=>{
                        if(data){
                            return of(duplicateUserSuccess({isDuplicate: true}),
                        showAlert({message:'Email Already Exist', resptype:'fail'}))
                            
                        }
                        else{
                            return of(duplicateUserSuccess({isDuplicate:false}))
                        }
                    }),
                    catchError((_err)=>of(showAlert({message:'Login Fail due to: '+_err.message, resptype:'fail'})))
                )
            })
        )
    )

    _loadmenubyrole = createEffect(()=>
        this.action$.pipe(
            ofType(fetchMenu),
            exhaustMap((action)=>{
                return this.userService.getMenuByRole(action.userrole).pipe(
                    map((data)=>{
                        return fetchMenuSuccess({menulist:data})
                    }),
                    catchError((_err)=>of(showAlert({message:'Fail to fetch MenuList due to: '+_err.message, resptype:'fail'})))
                )
            })
        )
    )

    _getallusers = createEffect(()=>
        this.action$.pipe(
            ofType(getUser),
            exhaustMap((action)=>{
                return this.userService.getEmployeeList().pipe(
                    map((data)=>{
                        return getUserSuccess({userlist:data})
                    }),
                    catchError((_err)=>of(showAlert({message:'Fail to get userlist due to: '+_err.message, resptype:'fail'})))
                )
            })
        )
    )

    

    _showAlert = createEffect(()=>
    this.action$.pipe(
        ofType(showAlert),
        exhaustMap((action)=>{
            return this.ShowSnackBarAlert(action.message,action.resptype).afterDismissed().pipe(
                map(()=>{
                    return emptyAction()
                })
            )
        })
    ))

    ShowSnackBarAlert(message:string, resptype:string='fail'){

        let _class = resptype==='pass'?'text-green':'text-red'

        return this._snackbar.open(message,'OK',{
            verticalPosition:'top',
            horizontalPosition:'end',
            duration:5000,
            panelClass:[_class]
        })

    }
}

