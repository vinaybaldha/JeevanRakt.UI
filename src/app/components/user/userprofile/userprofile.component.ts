import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { userinfo } from '../../../models/Employee';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../../services/account.service';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MaterialModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  profileDetails!: userinfo;
  user!: userinfo;
  edited: boolean = false;

  constructor(private authService: AccountService, private _router: Router) {}

  ngOnInit(): void {
    this.getProfileDetails();
  }

  editProfile() {
    this.edited = true;
    this.user = this.profileDetails;
  }

  getProfileDetails() {
    this.profileDetails = this.authService.getUserDataFromStorage();
  }

  updateUserProfile() {
    this.authService.UpdateUserProfile(this.user).subscribe(
      (data) => {
        console.log('UserProfile Updated succesfully');
      },
      (error) => {
        console.log('Profile Updation Failed');
        console.log(error.error);
      }
    );
  }
}
