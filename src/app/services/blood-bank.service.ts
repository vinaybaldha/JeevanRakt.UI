import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BloodBank } from '../models/BloodBank';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BloodBankService {
  constructor(private _http: HttpClient) {}

  bloodbankasSubject: BehaviorSubject<BloodBank> =
    new BehaviorSubject<BloodBank>(new BloodBank());
  bloodbank: Observable<BloodBank> = this.bloodbankasSubject.asObservable();

  public getBloodBanks(): Observable<BloodBank[]> {
    return this._http.get<BloodBank[]>(`${NAV_URL}/BloodBanks`);
  }

  public getBloodBankById(id: string): Observable<BloodBank> {
    return this._http.get<BloodBank>(`${NAV_URL}/BloodBanks/${id}`);
  }

  public getNearestBloodBank(lat: number, long: number): Observable<BloodBank> {
    return this._http.get<BloodBank>(
      `${NAV_URL}/BloodBanks/nearest?userLatitude=${lat}&userLongitude=${long}`
    );
  }
}
