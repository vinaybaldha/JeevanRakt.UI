import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Donor } from '../../../models/donor';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { deleteDonor, loadDonor, loadSpinner, updateDonor } from '../../../_store/donor/donor.actions';
import { getDonorList } from '../../../_store/donor/donor.selector';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [FormsModule, CommonModule,MaterialModule],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css',
})
export class DonorListComponent implements OnInit {
  donors: Donor[] | undefined;
  bloodGroup: any;
  title = '';
  edit:boolean = false

  // Store the selected donor for editing
  selectedDonor: Donor = {
    donorId: '',
    donorName: '',
    donorBloodType: '',
    donorGender: '',
    donorContactNumber: '',
    donorAge: 0,
    donorAddress: '',
  };

  constructor(private store:Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadSpinner({isLoaded:true}))
    this.reloadData();
  }

  reloadData() {
    this.store.dispatch(loadSpinner({isLoaded:true}))
    this.store.dispatch(loadDonor())
    this.store.select(getDonorList).subscribe(item=>{
      this.donors = item
    })

  }

  search() {
   
  }

  editDonor(donor: Donor) {
    this.selectedDonor = { ...donor };
    this.edit = true
  }

  saveEditedDonor() {
    this.store.dispatch(loadSpinner({isLoaded:true}))
    this.store.dispatch(updateDonor({inputData:this.selectedDonor}))

      this.selectedDonor = {
        donorId: '',
        donorName: '',
        donorBloodType: '',
        donorGender: '',
        donorContactNumber: '',
        donorAge: 0,
        donorAddress: '',
      };

      this.edit= false
  }

  deleteDonor(donor: Donor) {
    this.store.dispatch(loadSpinner({isLoaded:true}))
    this.store.dispatch(deleteDonor({donorId:donor.donorId}))
  }
}
