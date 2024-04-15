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

  ngOnInit(): void {}

  loginUser() {
    this._service.loginEmployee(this.user.email, this.user.password).subscribe(
      (data: Employee) => {
        console.log(data);
        console.log('Response Received');
        localStorage.setItem('currentUser', data.email);
        this._service.setJwtToken(data.token);
        this._service.currentUserSubject.next(data.email);
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
