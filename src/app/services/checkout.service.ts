import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private _http: HttpClient) {}

  public checkOut(id: string): Observable<any> {
    return this._http.get(`${NAV_URL}/CheckOut?recipientId=${id}`);
  }
}
