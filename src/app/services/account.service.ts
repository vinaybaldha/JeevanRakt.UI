import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee, RoleAccess, userinfo } from '../models/Employee';
import { Router } from '@angular/router';
import { Upload } from '../models/UploadImage';
import { Notification } from '../models/Notification';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private _http: HttpClient, private router: Router) {}
  private employeesSubject: BehaviorSubject<Employee[]> = new BehaviorSubject<
    Employee[]
  >([]);

  public currentUserSubject: BehaviorSubject<userinfo | null> =
    new BehaviorSubject<userinfo | null>(null);
  public currentUser: Observable<userinfo | null> =
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
  private tokenExpirationTimer: any;

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

  public getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${NAV_URL}/Account/users`);
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
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.clear();
    this.router.navigate(['login']);
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

  public resetPassword(resetPasswordDTO: {}): Observable<any> {
    return this._http.post<any>(
      `${NAV_URL}/Account/reset-password`,
      resetPasswordDTO
    );
  }

  public getProfileDetails(): Observable<any> {
    return this._http.get(`${NAV_URL}/Account/user`);
  }

  public UpdateUserProfile(employee: any): Observable<any> {
    return this._http.put<any>(`${NAV_URL}/Account/user`, employee);
  }

  public getTotalUsers(): Observable<any> {
    return this._http.get(`${NAV_URL}/account/totalusers`);
  }

  public duplicateUserName(username: string): Observable<any> {
    return this._http.get(`${NAV_URL}/account/user/valid?username=${username}`);
  }

  setUserToLocalStorage(userdata: userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata));
  }

  setInventoryIdToLocalStorage(inventoryId: string) {
    localStorage.setItem('inventoryId', JSON.stringify(inventoryId));
  }

  getUserDataFromStorage() {
    let _obj: userinfo = {
      employeeName: '',
      email: '',
      phoneNumber: '',
      token: '',
      filePath: '',
      role: '',
      bloodBankId: '',
    };

    if (localStorage.getItem('userdata') != null) {
      let jsonString = localStorage.getItem('userdata') as string;
      _obj = JSON.parse(jsonString);
      return _obj;
    } else {
      return _obj;
    }
  }

  getInventoryIdFromStorage() {
    if (localStorage.getItem('inventoryId') != null) {
      let jsonString = localStorage.getItem('inventoryId') as string;
      let inventoryId = JSON.parse(jsonString);
      return inventoryId;
    } else {
      return '';
    }
  }

  getMenuByRole(userrole: string): Observable<RoleAccess[]> {
    return this._http.get<RoleAccess[]>(
      `${NAV_URL}/account/user/roleaccess?userrole=${userrole}`
    );
  }

  haveMenuAccess(userrole: string, menu: string): Observable<RoleAccess[]> {
    return this._http.get<RoleAccess[]>(
      `${NAV_URL}/account/user/roleaccess?userrole=${userrole}&menu=${menu}`
    );
  }

  addNotification(notification: Notification) {
    return this._http.post(`https://localhost:7016/api/Message`,notification);
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }

  updateProfileImage(data: FormData) {
    return this._http.post(`https://localhost:7016/api/account/upload`, data);
  }
}
