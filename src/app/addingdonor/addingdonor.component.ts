import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-addingdonor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './addingdonor.component.html',
  styleUrl: './addingdonor.component.css',
})
export class AddingdonorComponent implements OnInit {
  loggedUser = '';
  tempUser = '';
  donor = new Donor();
  @ViewChild('addDonorform') addDonorForm!: NgForm;

  constructor(private _service: DonorService, private _router: Router) {}

  ngOnInit(): void {
    // $(document).ready(function () {
    //   var now = new Date();
    //   var day = ('0' + now.getDate()).slice(-2);
    //   var month = ('0' + (now.getMonth() + 1)).slice(-2);
    //   var today = now.getFullYear() + '-' + month + '-' + day;
    //   $('#date').val(today);
    // });
    //   this.tempUser = JSON.stringify(
    //     sessionStorage.getItem('loggedUser') || '{}'
    //   );
    //   if (
    //     this.tempUser.charAt(0) === '"' &&
    //     this.tempUser.charAt(this.tempUser.length - 1) === '"'
    //   ) {
    //     this.tempUser = this.tempUser.substr(1, this.tempUser.length - 2);
    //   }
    //   this.loggedUser = this.tempUser;
  }

  // navigateHome() {
  //   if (this.loggedUser === 'admin@gmail.com') {
  //     this._router.navigate(['/loginsuccess']);
  //   } else this._router.navigate(['/userdashboard']);
  // }

  addDonor() {
    var guid = uuidv4();
    this.donor.donorId = guid;
    console.log('guid: ', guid);
    this._service.addDonorFromRemote(this.donor).subscribe(
      (data) => {
        console.log('Donor added Successfully');
        // this._router.navigate(['/loginsuccess']);
        this.addDonorForm.reset();
        console.log('donor added successfully');
      },
      (error) => {
        console.log('process Failed');
        console.log(error.error);
      }
    );
  }
}
