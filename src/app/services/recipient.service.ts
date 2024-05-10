import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipient } from '../models/Recipient';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Filter } from '../models/Filter';
const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class RecipientService {
  constructor(private _http: HttpClient) {}

  public getRecipientList(
    bloodbankId: string,
    filter: Filter
  ): Observable<Recipient[]> {
    return this._http.get<Recipient[]>(
      `${NAV_URL}/Recipients/bloodbank?bloodbankId=${bloodbankId}&page=${filter.page}&pageSize=${filter.pageSize}&filterOn=${filter.filterOn}&filterQuery=${filter.filterQuery}&sortBy=${filter.sortBy}&isAccending=${filter.isAccending}`
    );
  }

  public addRecipientFromRemote(recipient: Recipient): Observable<any> {
    return this._http.post<any>(`${NAV_URL}/Recipients`, recipient);
  }

  public updateRecipient(recipient: any): Observable<any> {
    return this._http.put<any>(
      `${NAV_URL}/Recipients/${recipient.recipientId}`,
      recipient
    );
  }

  public deleteRecipient(id: string): Observable<any> {
    return this._http.delete<any>(`${NAV_URL}/Recipients/${id}`);
  }
}
