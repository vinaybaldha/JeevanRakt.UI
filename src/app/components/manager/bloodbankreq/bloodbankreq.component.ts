import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import {
  approveBloodBankRequest,
  loadPendingBloodBank,
} from '../../../_store/blood-bank/bloodbank.actions';
import { getPendingBloodBankList } from '../../../_store/blood-bank/bloodbank.selector';
import { BloodBank } from '../../../models/BloodBank';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-bloodbankreq',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './bloodbankreq.component.html',
  styleUrl: './bloodbankreq.component.css',
})
export class BloodbankreqComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.loadBloodBanks();
  }
  available: boolean = false;
  bloodbanks: BloodBank[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'bloodBankName',
    'address',
    'latitude',
    'longitude',
    'approve',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  loadBloodBanks() {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadPendingBloodBank());
    this.store.select(getPendingBloodBankList).subscribe((item) => {
      if (item.length === 0) {
        this.available = false;
      }
      this.available = true;
      this.bloodbanks = item;
      this.dataSource = new MatTableDataSource<BloodBank>(this.bloodbanks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  approveRequest(bloodbank: BloodBank) {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      approveBloodBankRequest({ bloodbankId: bloodbank.bloodBankId })
    );
  }
}
