import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BloodBank } from '../../../models/BloodBank';
import { BloodBankService } from '../../../services/blood-bank.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  bloodbank!: BloodBank;

  submit() {}

  onCancel() {
    this.router.navigate(['home']);
  }
}
