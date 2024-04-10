import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Blood } from '../models/Blood';
import { Observable } from 'rxjs';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DonateService {
  public addBlood(blood: Blood): Observable<any> {
    return this._http.put<any>(`${NAV_URL}/Bloods/${blood.bloodGroup}`, blood);
  }

  public getBloodList(): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/Bloods`);
  }

  public getBloodListById(id: string): Observable<any> {
    return this._http.get<any>(`${NAV_URL}/Bloods/${id}`);
  }
  constructor(private _http: HttpClient) {}
}
