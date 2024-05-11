import { Component } from '@angular/core';
import { BloodBankService } from '../../services/blood-bank.service';
import { BloodBank } from '../../models/BloodBank';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { loadBloodBank } from '../../_store/blood-bank/bloodbank.actions';
import { getBloodBankList } from '../../_store/blood-bank/bloodbank.selector';
import { MaterialModule } from '../../_module/Material.Module';
import { Router } from '@angular/router';
import { loadSpinner } from '../../_store/Globel/globel.actions';
import { Filter } from '../../models/Filter';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blood-banks',
  standalone: true,
  imports: [CommonModule, MatCardModule, MaterialModule, FormsModule],
  templateUrl: './blood-banks.component.html',
  styleUrl: './blood-banks.component.css',
})
export class BloodBanksComponent {
  bloodBanks: BloodBank[] = [];
  bloodbank!: BloodBank;
  visible: boolean = false;
  filter: Filter = {
    pageSize: 3,
    page: 1,
    sortBy: '',
    isAccending: true,
    filterOn: '',
    filterQuery: '',
  };
  pagesize: number = 6;
  filterOn: string = '';
  filterQuery: string = '';

  constructor(
    private store: Store,
    private bankService: BloodBankService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBloodBanks();
  }

  loadBloodBanks(): void {
    this.filter = {
      ...this.filter,
      pageSize: this.pagesize,
      filterOn: this.filterOn,
      filterQuery: this.filterQuery,
    };
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadBloodBank({ filter: this.filter }));
    this.store.select(getBloodBankList).subscribe((item) => {
      this.bloodBanks = item;
    });
  }

  getLocationService(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((resp) => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      });
    });
  }

  getLocation() {
    this.getLocationService().then((resp) => {
      console.log(resp);
      this.bankService
        .getNearestBloodBank(resp.lat, resp.lng)
        .subscribe((resp) => {
          this.bloodbank = resp;
          this.visible = true;
        });
    });
  }

  onBank(bank: BloodBank) {
    this.bankService.bloodbankasSubject.next(bank);
    this.router.navigate(['ubloodbank']);
  }

  onPrevious() {
    this.filter = { ...this.filter, page: this.filter.page - 1 };
    this.loadBloodBanks();
  }

  onNext() {
    this.filter = { ...this.filter, page: this.filter.page + 1 };
    this.loadBloodBanks();
  }
}
