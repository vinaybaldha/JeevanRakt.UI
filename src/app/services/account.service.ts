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
  constructor(private _http: HttpClient, private router: Router) {}
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >([]);

  public currentUserSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>('');
  public currentUser: Observable<string | null> =
    this.currentUserSubject.asObservable();

  public employees$: Observable<Employee[]> =
    this.employeesSubject.asObservable();
  private jwtToken: string | null = null;
  public AuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public authenticated: Observable<boolean> =
    this.AuthenticatedSubject.asObservable();

  public userSubject: BehaviorSubject<Employee | null> =
    new BehaviorSubject<Employee | null>(null);
  public user: Observable<Employee | null> = this.userSubject.asObservable();

  public isAdminSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAdmin: Observable<boolean> = this.isAdminSubject.asObservable();

  public isLoginSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isLogin: Observable<boolean> = this.isAdminSubject.asObservable();

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

  headers = new HttpHeaders({
    Authorization: `Bearer ${this.jwtToken}`,
  });

  public getEmployeeList(): void {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    });
    this._http
      .get<any>(`${NAV_URL}/Account/users`, {
        headers: headers,
      })
      .subscribe(
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
    localStorage.removeItem('roles');
    this.currentUserSubject.next(null);
    this.AuthenticatedSubject.next(false);
    this.isAdminSubject.next(false);
    this.userSubject.next(null);
    this.router.navigate(['/home']);
  }

  public async getRoles(email: string): Promise<string> {
    let data = '';
    await this._http
      .get(`${NAV_URL}/Account/getroles/${email}`)
      .subscribe((res) => {
        console.log(res);
        localStorage.setItem('roles', res.toString());
        console.log(res.toString());
        data = res.toString();
        if (data === 'Admin') {
          this.isAdminSubject.next(true);
        } else {
          this.isAdminSubject.next(false);
        }
      });
    return data;
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  public forgotPassword(email: string) {
    return this._http.post<any>(`${NAV_URL}/Account/forgot-password`, {
      email,
    });
  }

  public resetPassword(resetPasswordDTO: {}) {
    return this._http.post<any>(
      `${NAV_URL}/Account/reset-password`,
      resetPasswordDTO
    );
  }
}
