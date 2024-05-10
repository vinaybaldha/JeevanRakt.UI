import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DonateService } from '../../../services/donate.service';
import { Donor } from '../../../models/donor';
import { Blood, BloodInventory } from '../../../models/Blood';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
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

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
})
export class DonateComponent implements OnInit {
  constructor(
    private donateService: DonateService,
    private dialog: MatDialog,
    private store: Store,
    private authService: AccountService
  ) {}
  ngOnInit(): void {
    this.reloadData();
  }

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

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
      this.dataSourse = new MatTableDataSource<Donor>(data);
      this.dataSourse.paginator = this.paginator;
      this.dataSourse.sort = this.sort;
    });
    this.store.select(getBloodInventory).subscribe((item) => {
      this.bloodStock = item;
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
}
