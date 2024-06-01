import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Recipient } from '../../../models/Recipient';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { addRecipient } from '../../../_store/recipient/reipient.actions';
import { AccountService } from '../../../services/account.service';
import { BloodBank } from '../../../models/BloodBank';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Notification } from '../../../models/Notification';

@Component({
  selector: 'app-addingpatient',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './addingpatient.component.html',
  styleUrl: './addingpatient.component.css',
})
export class AddingpatientComponent implements OnInit {
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
  bloodbank!: BloodBank;
  recipient:Recipient = new Recipient();
  closeMessage = 'close using directive';
  notification: Notification = new Notification();
  @ViewChild('addrecipientform') addRecipientForm!: NgForm;

  constructor(
    private store: Store,
    private authService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ref: MatDialogRef<AddingpatientComponent>
  ) {}

  ngOnInit(): void {
    this.inputData = this.data;
    this.bloodbank = { ...this.data.selectedBloodBank };
  }

  inputData: any;
  addRecipient() {
    var guid = uuidv4();
    this.recipient.recipientId = guid;
    this.recipient.bloodBankId = this.bloodbank.bloodBankId;
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(addRecipient({ inputData: this.recipient }));
    this.addRecipientForm.resetForm();
    this.notification.productID = guid;
    this.notification.productName = this.recipient.recipientName;
    this.notification.message = `blood request from ${this.recipient.recipientName}`
    this.authService.addNotification(this.notification).subscribe((result) => {
      console.log('send notification');
    });
  }

  closePopup() {
    this.addRecipient();
    this.ref.close('close using function');
  }
}


