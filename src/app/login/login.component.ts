import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Employee } from '../models/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Store } from '@ngrx/store';
import { beginLogin } from '../_store/user/user.actions';
import { loadSpinner } from '../_store/Globel/globel.actions';

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
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      beginLogin({
        userdata: { email: this.user.email, password: this.user.password },
      })
    );
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
