import { Component, OnInit } from '@angular/core';
import { Donor } from '../donor';
import { DonorService } from '../donor.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-donor-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './donor-list.component.html',
  styleUrl: './donor-list.component.css',
})
export class DonorListComponent implements OnInit {
  donors: Observable<Donor[]> | undefined;
  bloodGroup: any;
  title = '';

  constructor(private donorService: DonorService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.donors = this.donorService.getDonorList();
  }

  search() {
    // if (this.bloodGroup == '') {
    //   this.reloadData();
    // } else {
    //   this.donors = this.donors?.pipe(
    //     map((results) =>
    //       results.filter((res) => {
    //         return res.donorBloodType
    //           .toLocaleLowerCase()
    //           .match(this.bloodGroup.toLocaleLowerCase());
    //       })
    //     )
    //   );
    // }
  }
}
