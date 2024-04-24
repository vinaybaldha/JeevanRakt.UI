import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Donor } from '../../../models/donor';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { deleteDonor, loadDonor } from '../../../_store/donor/donor.actions';
import { getDonorList } from '../../../_store/donor/donor.selector';
import { DonorService } from '../../../services/donor.service';

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

  constructor(private store:Store, private donorService:DonorService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.store.dispatch(loadDonor())
    this.store.select(getDonorList).subscribe(item=>{
      this.donors = item
    })

  }

  search() {
   
  }

  editDonor(donor: Donor) {
    this.selectedDonor = { ...donor };
  }

  saveEditedDonor() {
    this.donorService.updateDonor(this.selectedDonor).subscribe(() => {
      this.reloadData();
      this.selectedDonor = {
        donorId: '',
        donorName: '',
        donorBloodType: '',
        donorGender: '',
        donorContactNumber: '',
        donorAge: 0,
        donorAddress: '',
      };
    });
  }

  deleteDonor(donor: Donor) {
    this.store.dispatch(deleteDonor({donorId:donor.donorId}))
  }
}
