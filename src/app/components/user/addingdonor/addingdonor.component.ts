import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Donor } from '../../../models/donor';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { addDonor } from '../../../_store/donor/donor.actions';
import { BloodBank } from '../../../models/BloodBank';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-addingdonor',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './addingdonor.component.html',
  styleUrl: './addingdonor.component.css',
})
export class AddingdonorComponent implements OnInit {
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  loggedUser = '';
  tempUser = '';
  donor = new Donor();
  bloodbank!: BloodBank;
  genders: string[] = ['male', 'female', 'other'];
  @ViewChild('addDonorform') addDonorForm!: NgForm;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddingdonorComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.bloodbank = { ...this.data.selectedBloodBank };
  }

  inputData: any;
  closeMessage = 'close using directive';

  addDonor() {
    var guid = uuidv4();
    this.donor.donorId = guid;
    this.donor.bloodBankId = this.bloodbank.bloodBankId;
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(addDonor({ inputData: this.donor }));
  }

  closePopup() {
    this.addDonor();
    this.ref.close('close using function');
  }
}
