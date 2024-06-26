import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DonateService } from '../../../services/donate.service';
import { Donor } from '../../../models/donor';
import { Blood, BloodInventory } from '../../../models/Blood';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { getDonorList } from '../../../_store/donor/donor.selector';
import { getBloodInventory } from '../../../_store/bloodInventory/bloodInventory.selector';
import { userinfo } from '../../../models/Employee';
import { loadDonor } from '../../../_store/donor/donor.actions';
import { AccountService } from '../../../services/account.service';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { Filter } from '../../../models/Filter';
import { loadInventory } from '../../../_store/bloodInventory/bloodInventory.actions';
import { DonorService } from '../../../services/donor.service';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
  providers: [DonateService],
})
export class DonateComponent implements OnInit {
  constructor(
    private donateService: DonateService,
    private dialog: MatDialog,
    private store: Store,
    private authService: AccountService,
    private donorService: DonorService
  ) {}
  ngOnInit(): void {
    this.reloadData();
  }
  inputData: any;
  selectedDonor: Donor = {
    donorId: '',
    donorName: '',
    donorBloodType: '',
    donorAddress: '',
    donorAge: 0,
    donorContactNumber: '',
    donorGender: '',
    bloodBankId: '',
  };
  filter: Filter = {
    page: 1,
    pageSize: 5,
    filterOn: '',
    filterQuery: '',
    sortBy: '',
    isAccending: false,
  };
  donors: Donor[] | undefined;
  bloodStocks: Observable<Blood[]> | undefined;
  bloodStock: BloodInventory = {
    bloodInventoryId: '',
    a1: 0,
    a2: 0,
    b1: 0,
    b2: 0,
    o1: 0,
    o2: 0,
    aB1: 0,
    aB2: 0,
    bloodBankId: '',
  };
  dataSourse: any;
  displayedColumns: string[] = [
    'donorId',
    'donorName',
    'donorBloodType',
    'donorContactNumber',
    'donorGender',
    'donorAge',
    'donorAddress',
    'action',
  ];
  displayedColumns2: string[] = ['bloodGroup', 'bloodStock'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  bloodStockDataSource: any;
  totaldonor: number | undefined;

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.donateService
        .getBloodListById(this.selectedDonor.donorBloodType)
        .subscribe((res: Blood) => {
          console.log(res);
          res.bloodStock = res.bloodStock + 1;

          this.donateService.addBlood(res).subscribe(() => {
            this.reloadData();
            this.selectedDonor = {
              donorId: '',
              donorName: '',
              donorBloodType: '',
              donorGender: '',
              donorContactNumber: '',
              donorAge: 0,
              donorAddress: '',
              bloodBankId: '',
            };
            this.bloodStock = {
              bloodInventoryId: '',
              a1: 0,
              a2: 0,
              b1: 0,
              b2: 0,
              o1: 0,
              o2: 0,
              aB1: 0,
              aB2: 0,
              bloodBankId: '',
            };
          });
        });
      form.reset();
      this.bloodStocks = this.donateService.getBloodList();
    }
  }

  reloadData() {
    let userInfo: userinfo = this.authService.getUserDataFromStorage();
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      loadDonor({ bloodbankId: userInfo.bloodBankId, filter: this.filter })
    );

    this.store.select(getDonorList).subscribe((data) => {
      this.donors = data;
      this.donorService
        .getTotalDonorsById(userInfo.bloodBankId)
        .subscribe((data) => {
          this.totaldonor = data;
        });
      this.dataSourse = new MatTableDataSource<Donor>(data);
      this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
    });
    const inventoryId = this.authService.getInventoryIdFromStorage();
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadInventory({ inventoryId: inventoryId }));
    this.store.select(getBloodInventory).subscribe((item) => {
      this.bloodStock = item;
      let bloodstock: Blood[] = [
        { bloodGroup: 'A+', bloodStock: item.a1 },
        { bloodGroup: 'A-', bloodStock: item.a2 },
        { bloodGroup: 'B+', bloodStock: item.b1 },
        { bloodGroup: 'B-', bloodStock: item.b2 },
        { bloodGroup: 'AB+', bloodStock: item.aB1 },
        { bloodGroup: 'AB-', bloodStock: item.aB2 },
        { bloodGroup: 'O+', bloodStock: item.o1 },
        { bloodGroup: 'O-', bloodStock: item.o2 },
      ];
      this.bloodStockDataSource = new MatTableDataSource<Blood>(bloodstock);
    });
  }

  donateDonor(donor: Donor) {
    this.selectedDonor = { ...donor };
    this.OpenPopup(donor, 'Comfirm Donation');
  }

  filterChange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSourse.filter = value;
  }

  OpenPopup(selectedDonor: any, title: any) {
    var _popup = this.dialog.open(PopupComponent, {
      width: '60%',
      height: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        selectedDonor: selectedDonor,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.reloadData();
    });
  }

  handlePageEvent(event: PageEvent) {
    this.filter = {
      ...this.filter,
      pageSize: event.pageSize,
      page: event.pageIndex + 1,
    };
    this.reloadData();
  }
}
