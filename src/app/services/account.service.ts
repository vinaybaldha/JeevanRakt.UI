import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../models/Employee';
import { Router } from '@angular/router';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private _http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('currentUser')
    );
  }
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >([]);

  public currentUserSubject: BehaviorSubject<string | null>;

  public employees$: Observable<Employee[]> =
    this.employeesSubject.asObservable();
  private jwtToken: string | null = null;

  setJwtToken(token: string): void {
    this.jwtToken = token;
    // Store token in local storage or session storage
    localStorage.setItem('jwtToken', token);
  }

  getJwtToken(): string | null {
    if (!this.jwtToken) {
      this.jwtToken = localStorage.getItem('jwtToken');
    }
    return this.jwtToken;
  }

  public get getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.jwtToken}`,
  });

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

  public logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('jwtToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
