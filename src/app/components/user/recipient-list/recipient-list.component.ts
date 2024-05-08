import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Recipient } from '../../../models/Recipient';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import {
  deleteRecipient,
  loadRecipient,
  updateRecipient,
} from '../../../_store/recipient/reipient.actions';
import { getBloodBank } from '../../../_store/blood-bank/bloodbank.selector';
import { BloodBank } from '../../../models/BloodBank';
import { AccountService } from '../../../services/account.service';
import { userinfo } from '../../../models/Employee';
import { getRecipientList } from '../../../_store/recipient/recipient.selector';

@Component({
  selector: 'app-recipient-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './recipient-list.component.html',
  styleUrl: './recipient-list.component.css',
})
export class RecipientListComponent {
  recipients: Recipient[] | undefined;
  bloodGroup: any;
  title = '';
  selectedRecipient: Recipient = {
    recipientId: '',
    recipientName: '',
    recipientBloodType: '',
    recipientContactNumber: '',
    recipientGender: '',
    recipientAge: 0,
    recipientAddress: '',
    bloodBankId: '',
  };
  edit: boolean = false;

  constructor(private store: Store, private authService: AccountService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    let userInfo: userinfo = this.authService.getUserDataFromStorage();
    this.store.dispatch(loadRecipient({ bloodbankId: userInfo.bloodBankId }));
    this.store.select(getRecipientList).subscribe((item) => {
      this.recipients = item;
    });
  }

  search() {}

  editRecipient(recipient: Recipient) {
    this.selectedRecipient = { ...recipient };
    this.edit = true;
  }

  saveEditedRecipient() {
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
    };

    this.edit = false;
  }

  deleteRecipient(recipient: Recipient) {
    this.store.dispatch(
      deleteRecipient({ recipientId: recipient.recipientId })
    );
  }
}
