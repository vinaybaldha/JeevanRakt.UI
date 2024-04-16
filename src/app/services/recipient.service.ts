import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipient } from '../models/Recipient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class RecipientService {
  constructor(
    private _http: HttpClient,
    private _accountService: AccountService
  ) {}

  public getRecipientList(): Observable<Recipient[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.get<Recipient[]>(`${NAV_URL}/Recipients`, {
      headers: headers,
    });
  }
}
