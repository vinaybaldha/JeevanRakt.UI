import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipient } from '../Recipient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AccountService } from './account.service';
const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class RecipientService {
  headers = new HttpHeaders({
    Authorization: `Bearer ${this._accountService.getJwtToken()}`,
  });

  constructor(
    private _http: HttpClient,
    private _accountService: AccountService
  ) {}

  public getRecipientList(): Observable<Recipient[]> {
    return this._http.get<Recipient[]>(`${NAV_URL}/Recipients`, {
      headers: this.headers,
    });
  }
}
