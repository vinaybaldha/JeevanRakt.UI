import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Employee, userinfo } from '../models/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Store } from '@ngrx/store';
import { beginLogin } from '../_store/user/user.actions';
import { loadBloodBankById } from '../_store/blood-bank/bloodbank.actions';
import { getBloodBank } from '../_store/blood-bank/bloodbank.selector';
import { loadInventory } from '../_store/bloodInventory/bloodInventory.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  user = new Employee();
  msg = '';
  adminEmail = '';
  adminPassword = '';
  roles: string[] = [];

  constructor(
    private _service: AccountService,
    private _router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  loginUser() {
    this.store.dispatch(
      beginLogin({
        userdata: { email: this.user.email, password: this.user.password },
      })
    );
    // let userInfo: userinfo = this._service.getUserDataFromStorage();
    // this.store.dispatch(loadBloodBankById({ id: userInfo.bloodBankId }));
    // let inventoryId: string;
    // this.store.select(getBloodBank).subscribe((data) => {
    //   inventoryId = data.bloodInventory.bloodInventoryId;
    //   this.store.dispatch(loadInventory({ inventoryId: inventoryId }));
    // });
  }

  adminLogin() {
    if (this._service.loginEmployee(this.adminEmail, this.adminPassword)) {
      sessionStorage.setItem('loggedUser', this.adminEmail);
      sessionStorage.setItem('USER', 'admin');
      sessionStorage.setItem('ROLE', 'admin');
      this._router.navigate(['/loginsuccess']);
    } else {
      console.log('Exception Occured');
      this.msg = 'Bad admin credentials !!!';
    }
  }
}
