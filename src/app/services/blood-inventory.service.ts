import { Injectable } from '@angular/core';
import { BloodInventory } from '../models/Blood';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const NAV_URL = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BloodInventoryService {
  constructor(private _http: HttpClient) {}

  public updateBloodInventory(bloodInventory: BloodInventory): Observable<any> {
    return this._http.put<BloodInventory>(
      `${NAV_URL}/BloodInventories/${bloodInventory.bloodInventoryId}`,
      bloodInventory
    );
  }

  public addBloodInventory(bloodInventory: BloodInventory): Observable<any> {
    return this._http.post<BloodInventory>(
      `${NAV_URL}/BloodInventories`,
      bloodInventory
    );
  }

  public deleteBloodInventory(id: string): Observable<any> {
    return this._http.delete<any>(`${NAV_URL}/BloodInventries/${id}`);
  }

  public getBloodINventoryById(id: string): Observable<BloodInventory> {
    return this._http.get<BloodInventory>(`${NAV_URL}/BloodInventories/${id}`);
  }
}
