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
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
  });

  public addBlood(blood: Blood): Observable<any> {
    return this._http.put<any>(`${NAV_URL}/Bloods/${blood.bloodGroup}`, blood, {
      headers: this.headers,
    });
  }

  public getBloodList(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/Bloods`, {
      headers: this.headers,
    });
  }

  public getBloodListById(id: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/Bloods/${id}`, {
      headers: this.headers,
    });
  }
  constructor(
    private _http: HttpClient,
    private _accountService: AccountService
  ) {}
}
