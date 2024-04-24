import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { DonorService } from '../../../services/donor.service';
import { Donor } from '../../../models/donor';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { addDonor } from '../../../_store/donor/donor.actions';

@Component({
  selector: 'app-addingdonor',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './addingdonor.component.html',
  styleUrl: './addingdonor.component.css',
})
export class AddingdonorComponent implements OnInit {
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  loggedUser = '';
  tempUser = '';
  donor = new Donor();
  genders: string[] = ['male', 'female', 'other'];
  @ViewChild('addDonorform') addDonorForm!: NgForm;

  constructor(private store:Store, private _router: Router) {}

  ngOnInit(): void {
   
  }

  
  addDonor() {
    var guid = uuidv4();
    this.donor.donorId = guid;
    this.store.dispatch(addDonor({inputData: this.donor}))
    
  }
}