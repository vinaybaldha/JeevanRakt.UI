import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Donor } from '../../../models/donor';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import {
  deleteDonor,
  loadDonor,
  loadSpinner,
  updateDonor,
} from '../../../_store/donor/donor.actions';
import { getDonorList } from '../../../_store/donor/donor.selector';
import { AccountService } from '../../../services/account.service';
import { userinfo } from '../../../models/Employee';
import { loadBloodBankById } from '../../../_store/blood-bank/bloodbank.actions';
import { getBloodBank } from '../../../_store/blood-bank/bloodbank.selector';
import { BloodBank } from '../../../models/BloodBank';

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
    let userInfo: userinfo = this.authService.getUserDataFromStorage();
    this.store.dispatch(loadBloodBankById({ id: userInfo.bloodBankId }));
    this.store.select(getBloodBank).subscribe((item: BloodBank) => {
      this.donors = item.donors;
    });
    // this.store.dispatch(loadSpinner({ isLoaded: true }));
    // this.store.dispatch(loadDonor());
    // this.store.select(getDonorList).subscribe((item) => {
    //   this.donors = item;
    // });
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
}
