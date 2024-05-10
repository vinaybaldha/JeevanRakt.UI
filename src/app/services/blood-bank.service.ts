import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BloodBank } from '../models/BloodBank';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Filter } from '../models/Filter';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BloodBankService {
  constructor(private _http: HttpClient) {}

  bloodbankasSubject: BehaviorSubject<BloodBank> =
    new BehaviorSubject<BloodBank>(new BloodBank());
  bloodbank: Observable<BloodBank> = this.bloodbankasSubject.asObservable();

  public getBloodBanks(filter: Filter): Observable<BloodBank[]> {
    return this._http.get<BloodBank[]>(
      `${NAV_URL}/BloodBanks?page=${filter.page}&pageSize=${filter.pageSize}&filterOn=${filter.filterOn}&filterQuery=${filter.filterQuery}&sortBy=${filter.sortBy}&isAccending=${filter.isAccending}`
    );
  }

  public getBloodBankById(id: string): Observable<BloodBank> {
    return this._http.get<BloodBank>(`${NAV_URL}/BloodBanks/${id}`);
  }

  public getNearestBloodBank(lat: number, long: number): Observable<BloodBank> {
    return this._http.get<BloodBank>(
      `${NAV_URL}/BloodBanks/nearest?userLatitude=${lat}&userLongitude=${long}`
    );
  }

  public addBloodBank(bloodbank: BloodBank): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/BloodBanks`, bloodbank);
  }

  public updateBloodBank(bloodbank: any): Observable<any> {
    const bloodbankId: string = bloodbank.bloodBankId;
    return this._http.put<any>(
      `${NAV_URL}/BloodBanks/${bloodbankId}`,
      bloodbank
    );
  }

  public deleteBloodBank(id: string): Observable<any> {
    return this._http.delete<any>(`${NAV_URL}/BloodBanks/${id}`);
  }
}
