import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { FormsModule } from '@angular/forms';
import { Recipient } from '../../../models/Recipient';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { updateRecipient } from '../../../_store/recipient/reipient.actions';

@Component({
  selector: 'app-edit-recipient',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './edit-recipient.component.html',
  styleUrl: './edit-recipient.component.css',
})
export class EditRecipientComponent implements OnInit {
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<EditRecipientComponent>
  ) {}
  ngOnInit(): void {
    this.inputData = this.data;
    this.selectedRecipient = { ...this.data.selectedRecipient };
  }
  selectedRecipient: Recipient = new Recipient();
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

  saveEditedRecipient() {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(updateRecipient({ inputData: this.selectedRecipient }));

    this.selectedRecipient = {
      recipientId: '',
      recipientName: '',
      recipientBloodType: '',
      recipientContactNumber: '',
      recipientGender: '',
      recipientAge: 0,
      recipientAddress: '',
      bloodBankId: '',
      paymentStatus: '',
    };
  }

  closePopup() {
    this.saveEditedRecipient();
    this.ref.close('close using function');
  }
}
