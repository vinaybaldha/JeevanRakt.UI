import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donor } from '../models/donor';
import { environment } from '../../environments/environment';
import { Recipient } from '../models/Recipient';
import { AccountService } from './account.service';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  // user = new User();

  public getDonorList(): Observable<Donor[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.get<Donor[]>(`${NAV_URL}/Donors`, {
      headers: headers,
    });
  }

  // public getRequestHistory(): Observable<any> {
  //   return this._http.get<any>(`${NAV_URL}/requestHistory`);
  // }

  // public getRequestHistoryByEmail(loggedUser: string): Observable<any> {
  //   return this._http.get<any>(`${NAV_URL}/requestHistory/` + loggedUser);
  // }

  // public getUserList(): Observable<any> {
  //   return this._http.get<any>(`${NAV_URL}/userlist`);
  // }

  constructor(
    private _http: HttpClient,
    private _accountService: AccountService
  ) {}

  public addDonorFromRemote(donor: Donor): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.post<any>(`${NAV_URL}/Donors`, donor, {
      headers: headers,
    });
  }

  public addRecipientFromRemote(recipient: Recipient): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.post<any>(`${NAV_URL}/Recipients`, recipient, {
      headers: headers,
    });
  }

  // public requestForBlood(request: Requesting): Observable<any> {
  //   return this._http.post<any>(`${NAV_URL}/requestblood`, request);
  // }

  // public requestForAddingDonor(donor: Donor): Observable<any> {
  //   return this._http.post<any>(`${NAV_URL}/addAsDonor`, donor);
  // }

  // public getBloodDetails(): Observable<any> {
  //   return this._http.get<any>(`${NAV_URL}/bloodDetails`);
  // }

  // public getProfileDetails(loggedUser: string): Observable<any> {
  //   return this._http.get(`${NAV_URL}/profileDetails/` + loggedUser);
  // }

  public updateDonor(donor: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.put<any>(`${NAV_URL}/Donors/${donor.donorId}`, donor, {
      headers: headers,
    });
  }

  public deleteDonor(id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.delete<any>(`${NAV_URL}/Donors/${id}`, {
      headers: headers,
    });
  }

  // public acceptRequestForBlood(loggedUser: string): Observable<any> {
  //   return this._http.get(`${NAV_URL}/acceptstatus/` + loggedUser);
  // }

  // public rejectRequestForBlood(loggedUser: string): Observable<any> {
  //   return this._http.get(`${NAV_URL}/rejectstatus/` + loggedUser);
  // }

  public getTotalDonors(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.get(`${NAV_URL}/donor/totaldonors`, {
      headers: headers,
    });
  }

  public getTotalUsers(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.get(`${NAV_URL}/account/totalusers`, {
      headers: headers,
    });
  }

  public getTotalBloodGroups(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this._accountService.getJwtToken()}`,
    });
    return this._http.get(`${NAV_URL}/bloods/totalbloodgroup`, {
      headers: headers,
    });
  }

  // public getTotalUnits(): Observable<any> {
  //   return this._http.get(`${NAV_URL}/getTotalUnits`);
  // }

  // public getTotalRequests(loggedUser: string): Observable<any> {
  //   return this._http.get(`${NAV_URL}/getTotalRequests/` + loggedUser);
  // }

  // public getTotalDonationCount(loggedUser: string): Observable<any> {
  //   return this._http.get(`${NAV_URL}/getTotalDonationCount/` + loggedUser);
  // }
}
