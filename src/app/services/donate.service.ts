import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Blood } from '../models/Blood';
import { Observable } from 'rxjs';
import { AccountService } from './account.service';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DonateService {
  public addBlood(blood: Blood): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    });
    return this._http.put<any>(`${NAV_URL}/Bloods/${blood.bloodGroup}`, blood, {
      headers: headers,
    });
  }

  public getBloodList(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    });
    return this._http.get<any>(`${NAV_URL}/Bloods`, {
      headers: headers,
    });
  }

  public getBloodListById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
    });
    return this._http.get<any>(`${NAV_URL}/Bloods/${id}`, {
      headers: headers,
    });
  }
  constructor(
    private _http: HttpClient,
    private _accountService: AccountService
  ) {}
}
