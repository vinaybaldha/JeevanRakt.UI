import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donor } from '../models/donor';
import { environment } from '../../environments/environment';
import { Recipient } from '../models/Recipient';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  // user = new User();

  public getDonorList(bloodbankId: string): Observable<Donor[]> {
    return this._http.get<Donor[]>(
      `${NAV_URL}/Donors/bloodbank?bloodbankId=${bloodbankId}`
    );
  }

  constructor(private _http: HttpClient) {}

  public addDonorFromRemote(donor: Donor): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/Donors`, donor);
  }

  public updateDonor(donor: any): Observable<any> {
    return this._http.put<any>(`${NAV_URL}/Donors/${donor.donorId}`, donor);
  }

  public deleteDonor(id: string): Observable<any> {
    return this._http.delete<any>(`${NAV_URL}/Donors/${id}`);
  }

  public getTotalDonors(): Observable<any> {
    return this._http.get(`${NAV_URL}/donors/totaldonors`);
  }

  public getDonorById(id: string): Observable<any> {
    return this._http.get(`${NAV_URL}/donors/${id}`);
  }
}
