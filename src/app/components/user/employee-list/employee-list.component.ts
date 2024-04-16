import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { AccountService } from '../../../services/account.service';
import { Employee } from '../../../models/Employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  imports: [RouterModule, CommonModule, EmployeeRegisterComponent],
})
export class EmployeeListComponent implements OnInit {
  loggedemployee = '';
  tempUser = '';
  employees: Observable<Employee[]> | undefined;

  constructor(
    private _router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tempUser = JSON.stringify(
      sessionStorage.getItem('loggedemployee') || '{}'
    );
    if (
      this.tempUser.charAt(0) === '"' &&
      this.tempUser.charAt(this.tempUser.length - 1) === '"'
    ) {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedemployee = this.tempUser;

    this.reloadData();
  }

  reloadData() {
    this.employees = this.accountService.employees$;
    this.accountService.getEmployeeList();
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
