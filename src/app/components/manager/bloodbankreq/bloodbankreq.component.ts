import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadSpinner } from '../../../_store/Globel/globel.actions';

@Component({
  selector: 'app-bloodbankreq',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './bloodbankreq.component.html',
  styleUrl: './bloodbankreq.component.css',
})
export class BloodbankreqComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.loadBloodBanks();
  }
  loadBloodBanks() {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(loadPendingBloodBanks());
    this.store.select(getPendingRecipientList).subscribe((item) => {
      if (item.length === 0) {
        this.available = false;
      }
      this.available = true;
      this.recipients = item;
      this.dataSource = new MatTableDataSource<Recipient>(this.recipients);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
