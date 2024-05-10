import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Donor } from '../../models/donor';
import { BloodInventory } from '../../models/Blood';
import { MaterialModule } from '../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { getBloodInventory } from '../../_store/bloodInventory/bloodInventory.selector';
import { updateInventory } from '../../_store/bloodInventory/bloodInventory.actions';
import { loadSpinner } from '../../_store/Globel/globel.actions';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [FormsModule, MaterialModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css',
})
export class PopupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<PopupComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.selectedDonor = this.data.selectedDonor;
  }

  inputData: any;
  closeMessage = 'close using directive';
  selectedDonor: Donor = {
    donorId: '',
    donorName: '',
    donorBloodType: '',
    donorAddress: '',
    donorAge: 0,
    donorContactNumber: '',
    donorGender: '',
    bloodBankId: '',
  };
  bloodInventory: BloodInventory = new BloodInventory();

  closePopup(form: NgForm) {
    this, this.onSubmit(form);
    this.ref.close('close using function');
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.store.dispatch(loadSpinner({ isLoaded: true }));
      this.store.select(getBloodInventory).subscribe((item) => {
        this.bloodInventory = item;
      });

      const updatedInventory = { ...this.bloodInventory };
      switch (this.selectedDonor.donorBloodType) {
        case 'A+': {
          updatedInventory.a1 = this.bloodInventory.a1 + 1;
          break;
        }
        case 'A-': {
          updatedInventory.a2 = this.bloodInventory.a2 + 1;
          break;
        }
        case 'B+': {
          updatedInventory.b1 = this.bloodInventory.b1 + 1;
          break;
        }
        case 'B-': {
          updatedInventory.b2 = this.bloodInventory.b2 + 1;
          break;
        }
        case 'O+': {
          updatedInventory.o1 = this.bloodInventory.o1 + 1;
          break;
        }
        case 'O-': {
          updatedInventory.o2 = this.bloodInventory.o2 + 1;
          break;
        }
        case 'AB+': {
          updatedInventory.aB1 = this.bloodInventory.aB1 + 1;
          break;
        }
        case 'AB-': {
          updatedInventory.aB2 = this.bloodInventory.aB2 + 1;
          break;
        }
      }
      this.store.dispatch(loadSpinner({ isLoaded: true }));
      this.store.dispatch(updateInventory({ inputData: updatedInventory }));

      form.reset();
    }
  }
}
