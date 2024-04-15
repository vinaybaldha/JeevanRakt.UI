import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Donor } from './donor';
import { environment } from '../environments/environment';
import { Recipient } from './Recipient';
import { AccountService } from './services/account.service';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DonorService {
  // user = new User();

  public getDonorList(): Observable<Donor[]> {
    return this._http.get<Donor[]>(`${NAV_URL}/Donors`, {
      headers: this.headers,
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

  headers = new HttpHeaders({
    Authorization: `Bearer ${this._accountService.getJwtToken()}`,
  });

  public addDonorFromRemote(donor: Donor): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/Donors`, donor, {
      headers: this.headers,
    });
  }

  public addRecipientFromRemote(recipient: Recipient): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/Recipients`, recipient, {
      headers: this.headers,
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
    return this._http.put<any>(`${NAV_URL}/Donors/${donor.donorId}`, donor, {
      headers: this.headers,
    });
  }

  public deleteDonor(id: string): Observable<any> {
    return this._http.delete<any>(`${NAV_URL}/Donors/${id}`, {
      headers: this.headers,
    });
  }

  // public acceptRequestForBlood(loggedUser: string): Observable<any> {
  //   return this._http.get(`${NAV_URL}/acceptstatus/` + loggedUser);
  // }

  // public rejectRequestForBlood(loggedUser: string): Observable<any> {
  //   return this._http.get(`${NAV_URL}/rejectstatus/` + loggedUser);
  // }

  public getTotalDonors(): Observable<any> {
    return this._http.get(`${NAV_URL}/donor/totaldonors`, {
      headers: this.headers,
    });
  }

  public getTotalUsers(): Observable<any> {
    return this._http.get(`${NAV_URL}/account/totalusers`, {
      headers: this.headers,
    });
  }

  public getTotalBloodGroups(): Observable<any> {
    return this._http.get(`${NAV_URL}/bloods/totalbloodgroup`, {
      headers: this.headers,
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
