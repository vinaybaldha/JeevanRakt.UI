import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../../models/Employee';
import { Store } from '@ngrx/store';
import { beginRegister, duplicateUser } from '../../../../_store/user/user.actions';
import { isDuplicateUser } from '../../../../_store/user/user.selector';

@Component({
  selector: 'app-employee-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './employee-register.component.html',
  styleUrl: './employee-register.component.css',
})
export class EmployeeRegisterComponent {
  user = new Employee();
  msg = ' ';

  constructor(private store: Store, private _router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    // console.log(this.user);
    this.store.dispatch(beginRegister({ userdata: this.user }));
  }

  FunctionDuplicateUser(){
    const username = this.user.email
    if(username!= ''){
      this.store.dispatch(duplicateUser({username:username}))
      this.store.select(isDuplicateUser).subscribe(item=>{
        const isExist = item
        if(isExist){
          this.user.email = ''
        }
      })
    }
  }
}
