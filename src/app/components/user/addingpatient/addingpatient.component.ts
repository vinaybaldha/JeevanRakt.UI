import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Recipient } from '../../../models/Recipient';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { addRecipient } from '../../../_store/recipient/reipient.actions';
import { AccountService } from '../../../services/account.service';
import { BloodBankService } from '../../../services/blood-bank.service';
import { BloodBank } from '../../../models/BloodBank';
import { loadSpinner } from '../../../_store/Globel/globel.actions';

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
  recipient = new Recipient();
  @ViewChild('addrecipientform') addRecipientForm!: NgForm;

  constructor(
    private store: Store,
    private bloodbankService: BloodBankService,
    private authService: AccountService
  ) {}

  ngOnInit(): void {
    this.bloodbankService.bloodbank.subscribe((item) => {
      this.bloodbank = item;
    });
  }

  addRecipient() {
    var guid = uuidv4();
    this.recipient.recipientId = guid;
    this.recipient.bloodBankId = this.bloodbank.bloodBankId;
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(addRecipient({ inputData: this.recipient }));
    this.addRecipientForm.resetForm();
    this.authService.addNotification().subscribe((result) => {
      console.log('send notification');
    });
  }
}
