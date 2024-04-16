import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipientService } from '../../../services/recipient.service';
import { DonateService } from '../../../services/donate.service';
import { Recipient } from '../../../models/Recipient';
import { Blood } from '../../../models/Blood';

@Component({
  selector: 'app-blood-transfert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blood-transfert.component.html',
  styleUrl: './blood-transfert.component.css',
})
export class BloodTransfertComponent implements OnInit {
  constructor(
    private recipientService: RecipientService,
    private donateService: DonateService
  ) {}

  recipients: Observable<Recipient[]> | undefined;
  blood: Blood | null = null;

  transferRecipient(recipient: Recipient) {
    this.donateService
      .getBloodListById(recipient.recipientBloodType)
      .subscribe((res) => {
        this.blood = res;
      });
  }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.recipients = this.recipientService.getRecipientList();
  }

  confirmBlood() {
    if (this.blood !== null) {
      this.blood.bloodStock = this.blood.bloodStock - 1;
      this.donateService.addBlood(this.blood).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
