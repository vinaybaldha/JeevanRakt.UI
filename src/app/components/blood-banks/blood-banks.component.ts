import { Component } from '@angular/core';
import { BloodBankService } from '../../services/blood-bank.service';
import { BloodBank } from '../../models/BloodBank';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-blood-banks',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './blood-banks.component.html',
  styleUrl: './blood-banks.component.css',
})
export class BloodBanksComponent {
  bloodBanks: BloodBank[] = [];

  constructor(private bloodBankService: BloodBankService) {}

  ngOnInit(): void {
    this.loadBloodBanks();
  }

  loadBloodBanks(): void {
    this.bloodBankService.getBloodBanks().subscribe(
      (bloodBanks: BloodBank[]) => {
        this.bloodBanks = bloodBanks;
      },
      (error) => {
        console.error('Error loading blood banks:', error);
      }
    );
  }
}
