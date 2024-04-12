import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/Employee';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private _http: HttpClient) {}
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >([]);
  public employees$: Observable<Employee[]> =
    this.employeesSubject.asObservable();

  public getEmployeeList(): void {
    this._http.get<any>(`${NAV_URL}/Account/users`).subscribe(
      (employees: Employee[]) => {
        this.employeesSubject.next(employees);
      },
      (error) => {
        console.error('Failed to fetch employees', error);
      }
    );
  }

  public registerEmployee(employee: Employee): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/Account/Register`, employee);
  }

  public loginEmployee(email: string, password: string): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/Account/Login`, {
      email,
      password,
    });
  }
}
