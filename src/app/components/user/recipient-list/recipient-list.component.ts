import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipientService } from '../../../services/recipient.service';
import { Recipient } from '../../../models/Recipient';
import { MaterialModule } from '../../../_module/Material.Module';
import { Store } from '@ngrx/store';
import { loadRecipient } from '../../../_store/recipient/reipient.actions';
import { getRecipientList } from '../../../_store/recipient/recipient.selector';

@Component({
  selector: 'app-recipient-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './recipient-list.component.html',
  styleUrl: './recipient-list.component.css',
})
export class RecipientListComponent {
  recipients: Recipient[] | undefined;
  bloodGroup: any;
  title = '';

  constructor(private recipientService: RecipientService, private store:Store) {}

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.store.dispatch(loadRecipient())
    this.store.select(getRecipientList).subscribe(item=>{
      this.recipients = item
    })
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
