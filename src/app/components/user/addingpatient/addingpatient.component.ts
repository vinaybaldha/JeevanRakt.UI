import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Recipient } from '../../../models/Recipient';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { addRecipient } from '../../../_store/recipient/reipient.actions';

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

  constructor(private store : Store, private _router: Router) {}

  addRecipient() {
    var guid = uuidv4();
    this.recipient.recipientId = guid;
    this.store.dispatch(addRecipient({inputData:this.recipient}))
    this.addRecipientForm.resetForm()
  }
}
