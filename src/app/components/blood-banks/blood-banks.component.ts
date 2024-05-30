import { Component } from '@angular/core';
import { BloodBankService } from '../../services/blood-bank.service';
import { BloodBank } from '../../models/BloodBank';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { loadBloodBank } from '../../_store/blood-bank/bloodbank.actions';
import {
  getBloodBankList,
  getPages,
} from '../../_store/blood-bank/bloodbank.selector';
import { MaterialModule } from '../../_module/Material.Module';
import { Router } from '@angular/router';
import { loadSpinner } from '../../_store/Globel/globel.actions';
import { Filter } from '../../models/Filter';
import { FormsModule } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

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
  minPage: number = 1;
  maxPage: number = 10;
  totalItems: number = 100;
  page: number = 1;

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
      page: this.page,
    };
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadBloodBank({ filter: this.filter }));
    this.store.select(getBloodBankList).subscribe((item) => {
      this.bloodBanks = item;
    });
    this.store.select(getPages).subscribe((item) => {
      this.maxPage = item;
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
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.getLocationService().then((resp) => {
      console.log(resp);

      this.bankService
        .getNearestBloodBank(resp.lat, resp.lng)
        .subscribe((resp) => {
          this.bloodbank = resp;
          this.visible = true;
          this.store.dispatch(loadSpinner({ isLoaded: false }));
        });
    });
  }

  onBank(bank: BloodBank) {
    this.bankService.bloodbankasSubject.next(bank);
    this.router.navigate(['ubloodbank']);
  }

  onPrevious() {
    if (this.filter.page > this.minPage) {
      this.filter = { ...this.filter, page: this.filter.page - 1 };
      this.loadBloodBanks();
    }
  }

  onNext() {
    if (this.filter.page < this.maxPage) {
      this.filter = { ...this.filter, page: this.filter.page + 1 };
      this.loadBloodBanks();
    }
  }

  clear() {
    this.filter = {
      pageSize: 3,
      page: 1,
      sortBy: '',
      isAccending: true,
      filterOn: '',
      filterQuery: '',
    };
    this.filterQuery = '';
    this.filterOn = '';
    this.loadBloodBanks();
  }

  pageEvent(event: PageEvent) {
    this.pagesize = event.pageSize;
    this.page = event.pageIndex + 1;

    this.loadBloodBanks();
  }
}
