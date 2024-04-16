import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Donor } from '../../../models/donor';
import { DonorService } from '../../../services/donor.service';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css',
})
export class DonorListComponent implements OnInit {
  donors: Observable<Donor[]> | undefined;
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

  constructor(private donorService: DonorService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.donors = this.donorService.getDonorList();
  }

  search() {
    // if (this.bloodGroup == '') {
    //   this.reloadData();
    // } else {
    //   this.donors = this.donors?.pipe(
    //     map((results) =>
    //       results.filter((res) => {
    //         return res.donorBloodType
    //           .toLocaleLowerCase()
    //           .match(this.bloodGroup.toLocaleLowerCase());
    //       })
    //     )
    //   );
    // }
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
    this.donorService.deleteDonor(donor.donorId).subscribe(() => {
      this.reloadData();
    });
  }
}
