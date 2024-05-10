import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blood, BloodInventory } from '../../../models/Blood';
import { Store } from '@ngrx/store';
import { getBloodInventory } from '../../../_store/bloodInventory/bloodInventory.selector';
import { loadInventory } from '../../../_store/bloodInventory/bloodInventory.actions';
import { AccountService } from '../../../services/account.service';
import { loadSpinner } from '../../../_store/Globel/globel.actions';

@Component({
  selector: 'app-blood-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blood-stock.component.html',
  styleUrl: './blood-stock.component.css',
})
export class BloodStockComponent implements OnInit {
  loggedUser = '';
  tempUser = '';
  title = '';
  bloodDetails: Observable<Blood[]> | undefined;
  bloodInventory: BloodInventory = new BloodInventory();

  constructor(
    private _router: Router,
    private store: Store,
    private authService: AccountService
  ) {}

  ngOnInit(): void {
    this.getBloodDetails();
  }

  getBloodDetails() {
    const inventoryId = this.authService.getInventoryIdFromStorage();
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadInventory({ inventoryId: inventoryId }));
    this.store.select(getBloodInventory).subscribe((data) => {
      this.bloodInventory = data;
    });
  }

  navigateHome() {
    if (this.loggedUser === 'admin@gmail.com') {
      this.title = 'Admin Dashboard';
      this._router.navigate(['/loginsuccess']);
    } else {
      this.title = 'User Dashboard';
      this._router.navigate(['/userdashboard']);
    }
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
