import { Component } from '@angular/core';
import { BloodBankService } from '../../services/blood-bank.service';
import { BloodBank } from '../../models/BloodBank';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { loadBloodBank } from '../../_store/blood-bank/bloodbank.actions';
import { getBloodBankList } from '../../_store/blood-bank/bloodbank.selector';
import { MaterialModule } from '../../_module/Material.Module';

@Component({
  selector: 'app-blood-banks',
  standalone: true,
  imports: [CommonModule, MatCardModule, MaterialModule],
  templateUrl: './blood-banks.component.html',
  styleUrl: './blood-banks.component.css',
})
export class BloodBanksComponent {
  bloodBanks: BloodBank[] = [];

  constructor(private store:Store) {}

  ngOnInit(): void {
    this.loadBloodBanks();
  }

  loadBloodBanks(): void {
    this.store.dispatch(loadBloodBank())
    this.store.select(getBloodBankList).subscribe(item=>{
      this.bloodBanks = item
    })
  }
}
