import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import {
  deleteBloodBank,
  loadBloodBankById,
} from '../../../_store/blood-bank/bloodbank.actions';
import { AccountService } from '../../../services/account.service';
import { userinfo } from '../../../models/Employee';
import { getBloodBank } from '../../../_store/blood-bank/bloodbank.selector';
import { BloodBank } from '../../../models/BloodBank';
import { BloodInventory } from '../../../models/Blood';
import { MatDialog } from '@angular/material/dialog';
import { EditbloodbankComponent } from '../editbloodbank/editbloodbank.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-yourbloodbank',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './yourbloodbank.component.html',
  styleUrl: './yourbloodbank.component.css',
})
export class YourbloodbankComponent implements OnInit {
  isAvailable: boolean = false;
  bloodBank: BloodBank = {
    bloodBankId: '',
    bloodBankName: '',
    address: '',
    donors: [],
    recipients: [],
    latitude: 0,
    longitude: 0,
    bloodInventory: new BloodInventory(),
  };

  constructor(
    private store: Store,
    private authService: AccountService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    const userInfo: userinfo = this.authService.getUserDataFromStorage();
    if (userInfo.bloodBankId != null) {
      this.store.dispatch(loadBloodBankById({ id: userInfo.bloodBankId }));
      this.store.select(getBloodBank).subscribe((item) => {
        if (item.bloodBankId != null && item.bloodBankId != '') {
          this.bloodBank = item;
          this.isAvailable = true;
        }
      });
    } else {
      this.isAvailable = false;
    }
  }

  addbloodbank() {
    this.OpenPopup(new BloodBank(), 'Add BloodBank', false);
  }

  editbloodbank() {
    this.OpenPopup(this.bloodBank, 'Edit BloodBank', true);
  }

  deletebloodbank() {
    if (confirm('Are you sure you want to delete this bloodbank')) {
      this.store.dispatch(
        deleteBloodBank({ bloodbankId: this.bloodBank.bloodBankId })
      );
    }
  }

  OpenPopup(selectedBloodBank: BloodBank, title: any, isEdited: boolean) {
    var _popup = this.dialog.open(EditbloodbankComponent, {
      width: '60%',
      height: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        title: title,
        selectedBloodBank: selectedBloodBank,
        isEdited: isEdited,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
      this.reloadData();
    });
  }
}
