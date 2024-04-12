import { Component } from '@angular/core';
import { Employee } from '../../models/Employee';
import { AccountService } from '../../services/account.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private _service: AccountService, private _router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    console.log(this.user);
    this._service.registerEmployee(this.user).subscribe(
      (data) => {
        console.log('Registration Success');
        localStorage.setItem('username', this.user.email);
        // this._router.navigate(['/registrationsuccess']);
        this._service.getEmployeeList();
      },
      (error) => {
        console.log('Registration Failed');
        console.log(error.error);
        this.msg = 'User with ' + this.user.email + ' already exists !!!';
      }
    );
  }
}
