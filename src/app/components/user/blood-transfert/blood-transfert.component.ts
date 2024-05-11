import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Recipient } from '../../../models/Recipient';
import { Blood, BloodInventory } from '../../../models/Blood';
import { Store } from '@ngrx/store';
import {
  loadInventory,
  updateInventory,
} from '../../../_store/bloodInventory/bloodInventory.actions';
import { getBloodInventory } from '../../../_store/bloodInventory/bloodInventory.selector';
import { getRecipientList } from '../../../_store/recipient/recipient.selector';
import { userinfo } from '../../../models/Employee';
import { loadRecipient } from '../../../_store/recipient/reipient.actions';
import { AccountService } from '../../../services/account.service';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { Filter } from '../../../models/Filter';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app_NEGATIVEblood_NEGATIVEtransfert',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './blood-transfert.component.html',
  styleUrl: './blood-transfert.component.css',
})
export class BloodTransfertComponent implements OnInit {
  constructor(private store: Store, private authService: AccountService) {}

  recipients: Recipient[] | undefined;
  blood: Blood = new Blood();
  bloodInventory: BloodInventory = new BloodInventory();
  filter: Filter = {
    page: 1,
    pageSize: 10000,
    filterOn: '',
    filterQuery: '',
    sortBy: '',
    isAccending: false,
  };
  displayedColumns: string[] = [
    'recipientName',
    'recipientAge',
    'recipientBloodType',
    'recipientContactNumber',
    'recipientGender',
    'recipientAddress',
    'transfer',
  ];
  dataSource = new MatTableDataSource<Recipient>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  transferRecipient(recipient: Recipient) {
    const inventoryId = this.authService.getInventoryIdFromStorage();
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadInventory({ inventoryId: inventoryId }));
    this.store.select(getBloodInventory).subscribe((data) => {
      this.bloodInventory = data;
    });
    switch (recipient.recipientBloodType) {
      case 'A_POSITIVE': {
        this.blood.bloodGroup = 'A_POSITIVE';
        this.blood.bloodStock = this.bloodInventory.a1;
        break;
      }
      case 'A_NEGATIVE': {
        this.blood.bloodGroup = 'A_NEGATIVE';
        this.blood.bloodStock = this.bloodInventory.a2;
        break;
      }
      case 'B_POSITIVE': {
        this.blood.bloodGroup = 'B_POSITIVE';
        this.blood.bloodStock = this.bloodInventory.b1;
        break;
      }
      case 'B_NEGATIVE': {
        this.blood.bloodGroup = 'B_NEGATIVE';
        this.blood.bloodStock = this.bloodInventory.b2;
        break;
      }
      case 'O_POSITIVE': {
        this.blood.bloodGroup = 'O_POSITIVE';
        this.blood.bloodStock = this.bloodInventory.o1;
        break;
      }
      case 'O_NEGATIVE': {
        this.blood.bloodGroup = 'O_NEGATIVE';
        this.blood.bloodStock = this.bloodInventory.o2;
        break;
      }
      case 'AB_POSITIVE': {
        this.blood.bloodGroup = 'AB_POSITIVE';
        this.blood.bloodStock = this.bloodInventory.aB1;
        break;
      }
      case 'AB_NEGATIVE': {
        this.blood.bloodGroup = 'AB_NEGATIVE';
        this.blood.bloodStock = this.bloodInventory.aB2;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    let userInfo: userinfo = this.authService.getUserDataFromStorage();
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(
      loadRecipient({ bloodbankId: userInfo.bloodBankId, fiter: this.filter })
    );
    this.store.select(getRecipientList).subscribe((item) => {
      this.recipients = item;
      this.dataSource = new MatTableDataSource<Recipient>(this.recipients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  confirmBlood() {
    if (this.blood !== null) {
      this.bloodInventory;
      const updatedInventory = { ...this.bloodInventory };
      switch (this.blood.bloodGroup) {
        case 'A_POSITIVE': {
          updatedInventory.a1 = this.blood.bloodStock - 1;
          break;
        }
        case 'A_NEGATIVE': {
          updatedInventory.a2 = this.blood.bloodStock - 1;
          break;
        }
        case 'B_POSITIVE': {
          updatedInventory.b1 = this.blood.bloodStock - 1;
          break;
        }
        case 'B_NEGATIVE': {
          updatedInventory.b2 = this.blood.bloodStock - 1;
          break;
        }
        case 'O_POSITIVE': {
          updatedInventory.o1 = this.blood.bloodStock - 1;
          break;
        }
        case 'O_NEGATIVE': {
          updatedInventory.o2 = this.blood.bloodStock - 1;
          break;
        }
        case 'AB_POSITIVE': {
          updatedInventory.aB1 = this.blood.bloodStock - 1;
          break;
        }
        case 'AB_NEGATIVE': {
          updatedInventory.aB2 = this.blood.bloodStock - 1;
          break;
        }
      }
      this.store.dispatch(loadSpinner({ isLoaded: true }));
      this.store.dispatch(updateInventory({ inputData: updatedInventory }));
    }
  }
}
