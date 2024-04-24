import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BloodBank } from '../models/BloodBank';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BloodBankService {
  constructor(
    private _http: HttpClient
  ) {}

  public getBloodBanks(): Observable<BloodBank[]> {
    return this._http.get<BloodBank[]>(`${NAV_URL}/BloodBanks`);
  }
}
