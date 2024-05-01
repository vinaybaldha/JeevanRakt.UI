import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Employee } from '../models/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { Store } from '@ngrx/store';
import { beginLogin } from '../_store/user/user.actions';

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

  constructor(private _service: AccountService, private _router: Router, private store:Store) {}

  ngOnInit(): void {
    localStorage.clear()
  }

  loginUser() {
    let roles: string | null = '';
    // this._service.loginEmployee(this.user.email, this.user.password).subscribe(
    //   async (data: Employee) => {
    //     this._service.currentUserSubject.next(data.email);
    //     roles = await this._service.getRoles(data.email);
    //     // console.log('roles: ', roles);
    //     this._service.AuthenticatedSubject.next(true);
    //     localStorage.setItem('jwtToken', data.token);
    //     localStorage.setItem('username', data.email);

    //     // console.log(localStorage.getItem('roles'));
    //     this._service.currentUserSubject.next(data.email);
    //     this._service.userSubject.next(data);
    //     this._service.isAdminSubject.next(true);
    //     if (localStorage.getItem('roles') === 'Admin') {
    //       console.log('object');
    //       this._service.isAdminSubject.next(true);
    //     } else {
    //       console.log('object');
    //       this._service.isAdminSubject.next(false);
    //     }
    //     this._service;
    //     this._router.navigate(['home']);
    //   },
    //   (error: { error: any }) => {
    //     console.log(error.error);
    //     this.msg = 'Bad credentials, please enter valid credentials !!!';
    //   }
    // );

    this.store.dispatch(beginLogin({userdata: {email:this.user.email, password:this.user.password}}))
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
