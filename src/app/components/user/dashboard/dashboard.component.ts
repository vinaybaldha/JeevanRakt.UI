import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Donor } from '../../../models/donor';
import { DonorService } from '../../../services/donor.service';
import { MaterialModule } from '../../../_module/Material.Module';
import { AccountService } from '../../../services/account.service';
import { RecipientService } from '../../../services/recipient.service';
import { BloodInventoryService } from '../../../services/blood-inventory.service';
import { BloodBankService } from '../../../services/blood-bank.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule, MaterialModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  loggedUser = '';
  tempUser = '';
  // request = new Requesting();
  msg = '';
  // requests: Observable<Requesting[]> | undefined;
  donor = new Donor();
  number: Observable<any> | undefined;
  totalusers: Observable<any> | undefined;
  totalrecipients: Observable<any> | undefined;
  totalbloodstock: Observable<any> | undefined;
  totalbloodbank: Observable<any> | undefined;

  constructor(
    private _router: Router,
    private donorService: DonorService,
    private authService: AccountService,
    private recipientService: RecipientService,
    private bloodInventoryService: BloodInventoryService,
    private bloodbankService: BloodBankService
  ) {}

  ngOnInit(): void {
    this.number = this.donorService.getTotalDonors();
    this.totalusers = this.authService.getTotalUsers();
    this.totalrecipients = this.recipientService.getTotalRecipients();
    this.totalbloodstock = this.bloodInventoryService.getTotalBloodstocks();
    this.totalbloodbank = this.bloodbankService.getTotalBloodBanks();
  }

  navigateHome() {
    if (this.loggedUser === 'admin@gmail.com') {
      this._router.navigate(['/loginsuccess']);
    } else this._router.navigate(['/userdashboard']);
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
