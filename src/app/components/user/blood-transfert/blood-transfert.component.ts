import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipientService } from '../../../services/recipient.service';
import { Recipient } from '../../../models/Recipient';
import { Blood, BloodInventory } from '../../../models/Blood';
import { Store } from '@ngrx/store';
import { updateInventory } from '../../../_store/bloodInventory/bloodInventory.actions';
import { getBloodInventory } from '../../../_store/bloodInventory/bloodInventory.selector';
import { getRecipientList } from '../../../_store/recipient/recipient.selector';

@Component({
  selector: 'app-blood-transfert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blood-transfert.component.html',
  styleUrl: './blood-transfert.component.css',
})
export class BloodTransfertComponent implements OnInit {
  constructor(private store: Store) {}

  recipients: Recipient[] | undefined;
  blood: Blood = new Blood();
  bloodInventory: BloodInventory = new BloodInventory();
  transferRecipient(recipient: Recipient) {
    this.store.select(getBloodInventory).subscribe((data) => {
      this.bloodInventory = data;
    });
    switch (recipient.recipientBloodType) {
      case 'A+': {
        this.blood.bloodGroup = 'A+';
        this.blood.bloodStock = this.bloodInventory?.a1;
        break;
      }
      case 'A-': {
        this.blood.bloodGroup = 'A-';
        this.blood.bloodStock = this.bloodInventory?.a2;
        break;
      }
      case 'B+': {
        this.blood.bloodGroup = 'B+';
        this.blood.bloodStock = this.bloodInventory?.b1;
        break;
      }
      case 'B-': {
        this.blood.bloodGroup = 'B-';
        this.blood.bloodStock = this.bloodInventory?.b2;
        break;
      }
      case 'O+': {
        this.blood.bloodGroup = 'O+';
        this.blood.bloodStock = this.bloodInventory?.o1;
        break;
      }
      case 'O-': {
        this.blood.bloodGroup = 'O-';
        this.blood.bloodStock = this.bloodInventory?.o2;
        break;
      }
      case 'AB+': {
        this.blood.bloodGroup = 'AB+';
        this.blood.bloodStock = this.bloodInventory?.aB1;
        break;
      }
      case 'AB-': {
        this.blood.bloodGroup = 'AB-';
        this.blood.bloodStock = this.bloodInventory?.aB2;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.store.select(getRecipientList).subscribe((item) => {
      this.recipients = item;
    });
  }

  confirmBlood() {
    if (this.blood !== null) {
      this.bloodInventory;
      const updatedInventory = { ...this.bloodInventory };
      switch (this.blood.bloodGroup) {
        case 'A+': {
          updatedInventory.a1 = this.blood.bloodStock - 1;
          break;
        }
        case 'A-': {
          updatedInventory.a2 = this.blood.bloodStock - 1;
          break;
        }
        case 'B+': {
          updatedInventory.b1 = this.blood.bloodStock - 1;
          break;
        }
        case 'B-': {
          updatedInventory.b2 = this.blood.bloodStock - 1;
          break;
        }
        case 'O+': {
          updatedInventory.o1 = this.blood.bloodStock - 1;
          break;
        }
        case 'O-': {
          updatedInventory.o2 = this.blood.bloodStock - 1;
          break;
        }
        case 'AB+': {
          updatedInventory.aB1 = this.blood.bloodStock - 1;
          break;
        }
        case 'AB-': {
          updatedInventory.aB2 = this.blood.bloodStock - 1;
          break;
        }
      }
      this.store.dispatch(updateInventory({ inputData: updatedInventory }));
    }
  }
}
