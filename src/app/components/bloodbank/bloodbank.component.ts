import { Component, OnInit } from '@angular/core';
import { BloodBank } from '../../models/BloodBank';
import { BloodBankService } from '../../services/blood-bank.service';
import { MaterialModule } from '../../_module/Material.Module';
import { Blood } from '../../models/Blood';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bloodbank',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './bloodbank.component.html',
  styleUrl: './bloodbank.component.css',
})
export class BloodbankComponent implements OnInit {
  bloodbank!: BloodBank;
  totalDonors: number = 0;
  totalRecipients: number = 0;

  constructor(private bankService: BloodBankService, private router: Router) {}

  ngOnInit(): void {
    this.bankService.bloodbank.subscribe((item: BloodBank) => {
      this.bloodbank = item;
      this.totalDonors = item.donors.length;
      this.totalRecipients = item.recipients.length;
    });
  }

  donate() {
    this.router.navigate(['adddonor']);
  }

  addRequest() {
    this.router.navigate(['addrecipient']);
  }
}
