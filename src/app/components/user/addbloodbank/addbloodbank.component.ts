import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloodBank } from '../../../models/BloodBank';
import { BloodBankService } from '../../../services/blood-bank.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSpinner } from '../../../_store/Globel/globel.actions';
import { addBloodBank } from '../../../_store/blood-bank/bloodbank.actions';

@Component({
  selector: 'app-addbloodbank',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './addbloodbank.component.html',
  styleUrl: './addbloodbank.component.css',
})
export class AddbloodbankComponent {
  constructor(
    private bloodbankService: BloodBankService,
    private router: Router,
    private store: Store
  ) {}

  bloodbank: BloodBank = new BloodBank();

  submit() {
    this.store.dispatch(loadSpinner({ isLoaded: true }));
    this.store.dispatch(addBloodBank({ inputData: this.bloodbank }));
  }

  onCancel() {
    this.router.navigate(['home']);
  }
}
