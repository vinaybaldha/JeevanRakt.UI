import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatTableDataSource } from '@angular/material/table';
import { Recipient } from '../../../models/Recipient';
import { Store } from '@ngrx/store';
import { checkOut, loadSpinner } from '../../../_store/Globel/globel.actions';
import { loadPendingRecipient } from '../../../_store/recipient/reipient.actions';
import { getPendingRecipientList } from '../../../_store/recipient/recipient.selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-blood-requests',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './blood-requests.component.html',
  styleUrl: './blood-requests.component.css',
})
export class BloodRequestsComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.loadRecipients();
  }
  dataSource = new MatTableDataSource<Recipient>();
  displayedColumns: string[] = [
    'recipientName',
    'recipientAge',
    'recipientBloodType',
    'recipientContactNumber',
    'recipientGender',
    'recipientAddress',
    'paymentStatus',
    'pay',
  ];
  recipients: Recipient[] | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadRecipients() {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadPendingRecipient());
    this.store.select(getPendingRecipientList).subscribe((item) => {
      this.recipients = item;
      this.dataSource = new MatTableDataSource<Recipient>(this.recipients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onPay(recipient: Recipient) {
    this.store.dispatch(checkOut({ id: recipient.recipientId }));
  }
}
