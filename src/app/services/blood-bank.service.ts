import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodBank } from '../models/BloodBank';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BloodBankService {
  constructor(
    private _accountService: AccountService,
    private _http: HttpClient
  ) {}

  public getBloodBanks(): Observable<BloodBank[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.get<BloodBank[]>(`${NAV_URL}/BloodBanks`, {
      headers: headers,
    });
  }
}
