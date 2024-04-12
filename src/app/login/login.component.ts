import { Component } from '@angular/core';
import { AccountService } from '../services/account.service';
import { Router, RouterModule } from '@angular/router';
import { Employee } from '../models/Employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user = new Employee();
  msg = '';
  adminEmail = '';
  adminPassword = '';

  constructor(private _service: AccountService, private _router: Router) {}

  ngOnInit(): void {
    $('.admin-login-form').hide();

    $('.userlogin').click(function () {
      $('.user-login-form').hide();
      $('.admin-login-form').show();
    });

    $('.adminlogin').click(function () {
      $('.user-login-form').show();
      $('.admin-login-form').hide();
    });

    let currentUrl = window.location.href;
    if (currentUrl.includes('/userdashboard')) {
      window.onpopstate = function () {
        history.go(1);
      };
    }
  }

  loginUser() {
    this._service.loginEmployee(this.user.email, this.user.password).subscribe(
      (data: any) => {
        console.log(data);
        console.log('Response Received');
        sessionStorage.setItem('loggedUser', this.user.email);
        sessionStorage.setItem('USER', 'user');
        sessionStorage.setItem('ROLE', 'user');
        this._router.navigate(['/donor-list']);
      },
      (error: { error: any }) => {
        console.log(error.error);
        this.msg = 'Bad credentials, please enter valid credentials !!!';
      }
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
