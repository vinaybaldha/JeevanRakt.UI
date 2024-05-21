import { Component, OnInit } from '@angular/core';
import { BloodBank } from '../../models/BloodBank';
import { BloodBankService } from '../../services/blood-bank.service';
import { MaterialModule } from '../../_module/Material.Module';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Blood } from '../../models/Blood';
import { Location } from '@angular/common';

Chart.register(...registerables);

@Component({
  selector: 'app-bloodbank',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './bloodbank.component.html',
  styleUrl: './bloodbank.component.css',
})
export class BloodbankComponent implements OnInit {
  bloodbank!: BloodBank;
  totalDonors: number = 0;
  totalRecipients: number = 0;
  chartData: Blood[] = [];
  labeldata: string[] = [];
  realdata: number[] = [];
  colordata: string[] = [];

  constructor(
    private bankService: BloodBankService,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.bankService.bloodbank.subscribe((item: BloodBank) => {
      this.bloodbank = item;
      this.totalDonors = item.donors.length;
      this.totalRecipients = item.recipients.length;
      this.chartData = [
        { bloodGroup: 'A+', bloodStock: item.bloodInventory.a1 },
        { bloodGroup: 'A-', bloodStock: item.bloodInventory.a2 },
        { bloodGroup: 'B+', bloodStock: item.bloodInventory.b1 },
        { bloodGroup: 'B-', bloodStock: item.bloodInventory.b2 },
        { bloodGroup: 'AB+', bloodStock: item.bloodInventory.aB1 },
        { bloodGroup: 'AB-', bloodStock: item.bloodInventory.aB2 },
        { bloodGroup: 'O+', bloodStock: item.bloodInventory.o1 },
        { bloodGroup: 'O-', bloodStock: item.bloodInventory.o2 },
      ];
      if (this.chartData != null) {
        this.chartData.map((o) => {
          this.labeldata.push(o.bloodGroup);
          this.realdata.push(o.bloodStock);
          this.colordata.push('rgba(255, 99, 132)');
          this.colordata.push('rgba(54, 162, 235)');
          this.colordata.push('rgba(255, 206, 86)');
          this.colordata.push('rgba(75, 192, 192)');
          this.colordata.push('rgba(153, 102, 255)');
          this.colordata.push('rgba(255, 159, 64)');
          this.colordata.push('rgba(255, 99, 132)');
          this.colordata.push('rgba(54, 162, 235)');
        });
        this.RenderChart(this.labeldata, this.realdata, this.colordata);
      }
    });
  }

  donate() {
    this.router.navigate(['adddonor']);
  }

  addRequest() {
    this.router.navigate(['addrecipient']);
  }

  RenderChart(labeldata: any, valuedata: any, colordata: any) {
    const mychart = new Chart('barchart', {
      type: 'bar',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Blood Stock',
            data: valuedata,
            backgroundColor: colordata,
          },
        ],
      },
      options: {},
    });
  }
  goback() {
    this._location.back();
  }
}
