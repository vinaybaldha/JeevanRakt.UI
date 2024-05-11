import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Donor } from '../../../models/donor';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import {
  deleteDonor,
  loadDonor,
  updateDonor,
} from '../../../_store/donor/donor.actions';
import { userinfo } from '../../../models/Employee';
import { AccountService } from '../../../services/account.service';
import { getDonorList } from '../../../_store/donor/donor.selector';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { Filter } from '../../../models/Filter';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css',
})
export class DonorListComponent implements OnInit {
  donors: Donor[] | undefined;
  bloodGroup: any;
  title = '';
  edit: boolean = false;
  pagesize: number = 6;
  filter: Filter = {
    page: 1,
    pageSize: 100,
    filterOn: '',
    filterQuery: '',
    sortBy: '',
    isAccending: false,
  };
  filterOn:string=''
filterQuery:string=''
  // Store the selected donor for editing
  selectedDonor: Donor = {
    donorId: '',
    donorName: '',
    donorBloodType: '',
    donorGender: '',
    donorContactNumber: '',
    donorAge: 0,
    donorAddress: '',
    bloodBankId: '',
  };

  constructor(private store: Store, private authService: AccountService) {}

  ngOnInit(): void {
    // this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.reloadData();
  }

  reloadData() {
    this.filter = { ...this.filter, pageSize: this.pagesize, filterOn: this.filterOn, filterQuery: this.filterQuery};
    let userInfo: userinfo = this.authService.getUserDataFromStorage();
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      loadDonor({ bloodbankId: userInfo.bloodBankId, filter: this.filter })
    );
    this.store.select(getDonorList).subscribe((item) => {
      this.donors = item;
    });
  }

  search() {}

  editDonor(donor: Donor) {
    this.selectedDonor = { ...donor };
    this.edit = true;
  }

  saveEditedDonor() {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(updateDonor({ inputData: this.selectedDonor }));

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

    this.edit = false;
  }

  deleteDonor(donor: Donor) {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(deleteDonor({ donorId: donor.donorId }));
  }

  onPrevious() {
    this.filter = { ...this.filter, page: this.filter.page - 1 };
    this.reloadData();
  }

  onNext() {
    this.filter = { ...this.filter, page: this.filter.page + 1 };
    this.reloadData();
  }
}
