import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { updateDonor } from '../../../_store/donor/donor.actions';
import { Donor } from '../../../models/donor';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-edit-donor',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './edit-donor.component.html',
  styleUrl: './edit-donor.component.css',
})
export class EditDonorComponent implements OnInit {
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditDonorComponent>
  ) {}
  ngOnInit(): void {
    this.inputData = this.data;
    this.selectedDonor = { ...this.data.selectedDonor };
  }
  selectedDonor: Donor = new Donor();
  inputData: any;
  closeMessage = 'close using directive';
  bloodGroups: string[] = [
    'A_POSITIVE',
    'A_NEGATIVE',
    'B_POSITIVE',
    'B_NEGATIVE',
    'O_POSITIVE',
    'O_NEGATIVE',
    'AB_POSITIVE',
    'AB_NEGATIVE',
  ];
  genders: string[] = ['male', 'female', 'other'];
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
  }
  closePopup() {
    this.saveEditedDonor();
    this.ref.close('close using function');
  }
}
