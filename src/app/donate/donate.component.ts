import { Component, OnInit } from '@angular/core';
import { Donor } from '../donor';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Blood } from '../models/Blood';
import { Observable } from 'rxjs';
import { DonorService } from '../donor.service';
import { DonateService } from '../services/donate.service';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
})
export class DonateComponent implements OnInit {
  constructor(
    private donateService: DonateService,
    private donorService: DonorService
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
  };

  donors: Observable<Donor[]> | undefined;
  bloodStocks: Observable<Blood[]> | undefined;
  bloodStock: Blood = {
    bloodGroup: '',
    bloodStock: 0,
  };

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
            };
            this.bloodStock = {
              bloodGroup: '',
              bloodStock: 0,
            };
          });
        });

      // this.bloodStock.bloodStock = this.bloodStock.bloodStock + 1;
      // Process form data (e.g., save donor information)

      // console.log('Form submitted!', this.selectedDonor);
      // Clear form fields after submission
      form.reset();
      this.bloodStocks = this.donateService.getBloodList();
    }
  }

  reloadData() {
    this.donors = this.donorService.getDonorList();
    this.bloodStocks = this.donateService.getBloodList();
  }

  donateDonor(donor: Donor) {
    this.selectedDonor = { ...donor };
  }
}
