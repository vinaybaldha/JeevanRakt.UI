import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Recipient } from '../../../models/Recipient';
import { DonorService } from '../../../services/donor.service';
import { MaterialModule } from '../../../_module/Material.Module';
import { RecipientService } from '../../../services/recipient.service';

@Component({
  selector: 'app-addingpatient',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule
  ],
  templateUrl: './addingpatient.component.html',
  styleUrl: './addingpatient.component.css',
})
export class AddingpatientComponent {
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  genders: string[] = ['male', 'female', 'other'];
  recipient = new Recipient();
  @ViewChild('addrecipientform') addRecipientForm!: NgForm;

  constructor(private _service: RecipientService, private _router: Router) {}

  addRecipient() {
    var guid = uuidv4();
    this.recipient.recipientId = guid;
    this._service.addRecipientFromRemote(this.recipient).subscribe(
      (data) => {
        // this._router.navigate(['/loginsuccess']);
        this.addRecipientForm.reset();
        console.log('Recipient added successfully');
        this._router.navigate(['/recipient-list']);
      },
      (error) => {
        console.log('process Failed');
        console.log(error.error);
      }
    );
  }
}
