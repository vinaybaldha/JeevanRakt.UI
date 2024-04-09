import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipient } from '../Recipient';
import { RecipientService } from '../services/recipient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recipient-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipient-list.component.html',
  styleUrl: './recipient-list.component.css',
})
export class RecipientListComponent {
  recipients: Observable<Recipient[]> | undefined;
  bloodGroup: any;
  title = '';

  constructor(private recipientService: RecipientService) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.recipients = this.recipientService.getRecipientList();
  }

  search() {
    // if (this.bloodGroup == '') {
    //   this.reloadData();
    // } else {
    //   this.recipient = this.recipient?.pipe(
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
