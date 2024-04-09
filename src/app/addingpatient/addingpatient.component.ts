import { Component, ViewChild } from '@angular/core';
import { DonorService } from '../donor.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Recipient } from '../Recipient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addingpatient',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './addingpatient.component.html',
  styleUrl: './addingpatient.component.css',
})
export class AddingpatientComponent {
  recipient = new Recipient();
  @ViewChild('addrecipientform') addRecipientForm!: NgForm;

  constructor(private _service: DonorService, private _router: Router) {}

  addRecipient() {
    var guid = uuidv4();
    this.recipient.recipientId = guid;
    this._service.addRecipientFromRemote(this.recipient).subscribe(
      (data) => {
        // this._router.navigate(['/loginsuccess']);
        this.addRecipientForm.reset();
        console.log('Recipient added successfully');
      },
      (error) => {
        console.log('process Failed');
        console.log(error.error);
      }
    );
  }
}
