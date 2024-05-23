import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BloodBank } from '../../../models/BloodBank';
import { BloodInventory } from '../../../models/Blood';
import { FormsModule, NgForm } from '@angular/forms';
import {
  addBloodBank,
  updateBloodBank,
} from '../../../_store/blood-bank/bloodbank.actions';
import { MaterialModule } from '../../../_module/Material.Module';
import { AccountService } from '../../../services/account.service';
import { userinfo } from '../../../models/Employee';
import { loadSpinner } from '../../../_store/Globel/globel.actions';

@Component({
  selector: 'app-editbloodbank',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './editbloodbank.component.html',
  styleUrl: './editbloodbank.component.css',
})
export class EditbloodbankComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditbloodbankComponent>,
    private store: Store,
    private authService: AccountService
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.selectedBloodBank = { ...this.data.selectedBloodBank };
    this.isEdited = this.data.isEdited;
  }

  inputData: any;
  closeMessage = 'close using directive';
  selectedBloodBank: BloodBank = {
    bloodBankId: '',
    bloodBankName: '',
    address: '',
    donors: [],
    recipients: [],
    latitude: 0,
    longitude: 0,
    bloodInventory: new BloodInventory(),
  };
  isEdited: boolean = false;

  closePopup(form: NgForm) {
    this.onSubmit(form);
    this.ref.close('close using function');
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      if (this.isEdited) {
        let updatedBloodBank: any = {
          bloodBankId: this.selectedBloodBank.bloodBankId,
          bloodBankName: form.value.bloodBankName,
          address: form.value.address,
          latitude: form.value.latitude,
          longitude: form.value.longitude,
        };
        this.store.dispatch(loadSpinner({ isLoaded: true }));
        this.store.dispatch(updateBloodBank({ inputData: updatedBloodBank }));

        form.reset();
      } else {
        const userInfo: userinfo = this.authService.getUserDataFromStorage();
        let newBloodBank: any = {
          bloodBankId: userInfo.bloodBankId,
          bloodBankName: form.value.bloodBankName,
          address: form.value.address,
          latitude: form.value.latitude,
          longitude: form.value.longitude,
        };
        this.store.dispatch(loadSpinner({ isLoaded: true }));
        this.store.dispatch(addBloodBank({ inputData: newBloodBank }));
      }
    }
  }
}
