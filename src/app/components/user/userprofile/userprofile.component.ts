import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Employee } from '../../../models/Employee';
import { CommonModule } from '@angular/common';
import $ from 'jquery';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  loggedUser = '';
  tempUser = '';
  temp = false;
  profileDetails: Employee | undefined;
  user: Employee = new Employee();
  msg = ' ';

  constructor(private authService: AccountService, private _router: Router) {}

  ngOnInit(): void {
    this.tempUser = JSON.stringify(localStorage.getItem('username') || '{}');
    if (
      this.tempUser.charAt(0) === '"' &&
      this.tempUser.charAt(this.tempUser.length - 1) === '"'
    ) {
      this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    }
    this.loggedUser = this.tempUser;

    // this.donorService.getProfileDetails(this.loggedUser)
    //   .subscribe(data => {
    //     console.log(data)
    //     this.user = data;
    //   }, error => console.log(error));
    this.getProfileDetails();
    $('#profileform').hide();
  }

  editProfile() {
    $('#profilecard').hide();
    $('#profileform').show();
  }

  getProfileDetails() {
    this.authService.getProfileDetails().subscribe((res) => {
      this.profileDetails = res;
    });
    console.log(this.profileDetails);
  }

  updateUserProfile() {
    this.authService.UpdateUserProfile(this.user).subscribe(
      (data) => {
        console.log('UserProfile Updated succesfully');
        //localStorage.setItem("username",this.user.username);
        this.msg = 'Profile Updated Successfully !!!';
        $('.editbtn').hide();
        $('#message').show();
        this.temp = true;
        $('#profilecard').show();
        $('#profileform').hide();
        setTimeout(() => {
          this._router.navigate(['/userdashboard']);
        }, 6000);
      },
      (error) => {
        console.log('Profile Updation Failed');
        console.log(error.error);
        this.msg = 'Profile Updation Failed !!!';
      }
    );
  }

  logout() {
    sessionStorage.clear();
    this._router.navigate(['/login']);
  }
}
