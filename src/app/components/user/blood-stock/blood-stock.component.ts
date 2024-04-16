import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blood } from '../../../models/Blood';
import { DonateService } from '../../../services/donate.service';

@Component({
  selector: 'app-blood-stock',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blood-stock.component.html',
  styleUrl: './blood-stock.component.css',
})
export class BloodStockComponent implements OnInit {
  loggedUser = '';
  tempUser = '';
  title = '';
  bloodDetails: Observable<Blood[]> | undefined;

  constructor(
    private donateService: DonateService,
    private activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // this.tempUser = JSON.stringify(sessionStorage.getItem('loggedUser')|| '{}');
    // if (this.tempUser.charAt(0) === '"' && this.tempUser.charAt(this.tempUser.length -1) === '"')
    // {
    //   this.tempUser = this.tempUser.substr(1, this.tempUser.length-2);
    // }
    // this.loggedUser = this.tempUser;

    this.getBloodDetails();

    // if(this.loggedUser === "admin@gmail.com"){
    //   this.title = "Admin Dashboard";
    // }
    // else{
    //   this.title = "User Dashboard";
    // }
  }

  getBloodDetails() {
    this.bloodDetails = this.donateService.getBloodList();
  }

  navigateHome() {
    if (this.loggedUser === 'admin@gmail.com') {
      this.title = 'Admin Dashboard';
      this._router.navigate(['/loginsuccess']);
    } else {
      this.title = 'User Dashboard';
      this._router.navigate(['/userdashboard']);
    }
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
