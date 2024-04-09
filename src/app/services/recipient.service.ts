import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipient } from '../Recipient';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class RecipientService {
  constructor(private _http: HttpClient) {}

  public getRecipientList(): Observable<Recipient[]> {
    return this._http.get<Recipient[]>(`${NAV_URL}/Recipients`);
  }
}
