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
import { AccountService } from '../../../services/account.service';
import { userinfo } from '../../../models/Employee';
import { getRecipientList } from '../../../_store/recipient/recipient.selector';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { Filter } from '../../../models/Filter';
import { EditRecipientComponent } from '../edit-recipient/edit-recipient.component';
import { MatDialog } from '@angular/material/dialog';

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
    paymentStatus: '',
  };
  edit: boolean = false;
  filter: Filter = {
    page: 1,
    pageSize: 5,
    filterOn: '',
    filterQuery: '',
    sortBy: '',
    isAccending: false,
  };
  filterOn: string = '';
  filterQuery: string = '';
  pagesize: number = 6;

  constructor(
    private store: Store,
    private authService: AccountService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.filter = {
      ...this.filter,
      pageSize: this.pagesize,
      filterOn: this.filterOn,
      filterQuery: this.filterQuery,
    };
    let userInfo: userinfo = this.authService.getUserDataFromStorage();
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      loadRecipient({ bloodbankId: userInfo.bloodBankId, fiter: this.filter })
    );
    this.store.select(getRecipientList).subscribe((item) => {
      this.recipients = item;
    });
  }

  search() {}

  editRecipient(recipient: Recipient) {
    this.OpenPopup(recipient);
  }

  deleteRecipient(recipient: Recipient) {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      deleteRecipient({ recipientId: recipient.recipientId })
    );
  }

  onPrevious() {
    this.filter = { ...this.filter, page: this.filter.page - 1 };
    this.reloadData();
  }

  onNext() {
    this.filter = { ...this.filter, page: this.filter.page + 1 };
    this.reloadData();
  }

  clear() {
    this.filter = {
      pageSize: 3,
      page: 1,
      sortBy: '',
      isAccending: true,
      filterOn: '',
      filterQuery: '',
    };
    this.filterQuery = '';
    this.filterOn = '';
    this.reloadData();
  }

  OpenPopup(selectedRecipient: Recipient) {
    var _popup = this.dialog.open(EditRecipientComponent, {
      width: '60%',
      height: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        selectedRecipient: selectedRecipient,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.reloadData();
    });
  }
}
