import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { DonateService } from '../../services/donate.service';
import { Donor } from '../../models/donor';
import { Blood } from '../../models/Blood';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatCardModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private ref: MatDialogRef<PopupComponent>, private donateService: DonateService){}

  ngOnInit(): void {
    this.inputData = this.data
    this.selectedDonor = this.data.selectedDonor
  }

  inputData:any
  closeMessage='close using directive'
  selectedDonor: Donor = {
    donorId: '',
    donorName: '',
    donorBloodType: '',
    donorAddress: '',
    donorAge: 0,
    donorContactNumber: '',
    donorGender: '',
  };

  closePopup(form: NgForm){
    this,this.onSubmit(form)
    this.ref.close('close using function')

  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.donateService
        .getBloodListById(this.selectedDonor.donorBloodType)
        .subscribe((res: Blood) => {
          console.log(res);
          res.bloodStock = res.bloodStock + 1;

          this.donateService.addBlood(res).subscribe(() => {
            // this.reloadData();
            // this.selectedDonor = {
            //   donorId: '',
            //   donorName: '',
            //   donorBloodType: '',
            //   donorGender: '',
            //   donorContactNumber: '',
            //   donorAge: 0,
            //   donorAddress: '',
            // };
            // this.bloodStock = {
            //   bloodGroup: '',
            //   bloodStock: 0,
            // };
          });
        });

      // this.bloodStock.bloodStock = this.bloodStock.bloodStock + 1;
      // Process form data (e.g., save donor information)

      // console.log('Form submitted!', this.selectedDonor);
      // Clear form fields after submission
      form.reset();
      // this.bloodStocks = this.donateService.getBloodList();
    }
  }
}
