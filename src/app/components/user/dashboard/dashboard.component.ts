import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Donor } from '../../../models/donor';
import { DonorService } from '../../../services/donor.service';
import { MaterialModule } from '../../../_module/Material.Module';
import { AccountService } from '../../../services/account.service';
import { DonateService } from '../../../services/donate.service';
import { RecipientService } from '../../../services/recipient.service';

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

  constructor(
    private _router: Router,
    private donorService: DonorService,
    private authService: AccountService,
    private donateService: DonateService,
    private recipientService: RecipientService
  ) {}

  ngOnInit(): void {
    this.tempUser = JSON.stringify(
      sessionStorage.getItem('loggedUser') || '{}'
    );
    if (
      this.tempUser.charAt(0) === '"' &&
      this.tempUser.charAt(this.tempUser.length - 1) === '"'
    ) {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;
    this.msg = '';
    this.number = this.donorService.getTotalDonors();
    this.totalusers = this.authService.getTotalUsers();
    this.totalrecipients = this.recipientService.getTotalRecipients();
    // this.totalunits = this.donorService.getTotalUnits();
    // this.donationcount = this.donorService.getTotalDonationCount(
    //   this.loggedUser
    // );
    // this.totalrequests = this.donorService.getTotalRequests(this.loggedUser);
    // this.requests = this.donorService.getRequestHistory();
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
