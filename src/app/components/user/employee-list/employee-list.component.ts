import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { Employee } from '../../../models/Employee';
import { Store } from '@ngrx/store';
import { getUser } from '../../../_store/user/user.actions';
import { getuserlist } from '../../../_store/user/user.selector';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { loadSpinner } from '../../../_store/Globel/globel.actions';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  imports: [
    RouterModule,
    CommonModule,
    EmployeeRegisterComponent,
    MaterialModule,
  ],
})
export class EmployeeListComponent implements OnInit {
  loggedemployee = '';
  tempUser = '';
  employees: Employee[] | undefined;
  displayedColumns: string[] = ['employeeName', 'phoneNumber', 'email', 'role'];
  dataSource = new MatTableDataSource<Employee>();

  constructor(private _router: Router, private store: Store) {}

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
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(getUser());
    this.store.select(getuserlist).subscribe((item) => {
      this.employees = item;

      this.dataSource = new MatTableDataSource<Employee>(this.employees);
    });
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
