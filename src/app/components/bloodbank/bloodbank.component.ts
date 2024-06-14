import { Component, OnInit } from '@angular/core';
import { BloodBank } from '../../models/BloodBank';
import { BloodBankService } from '../../services/blood-bank.service';
import { MaterialModule } from '../../_module/Material.Module';
import { Chart, registerables } from 'chart.js';
import { Blood } from '../../models/Blood';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AddingdonorComponent } from '../user/addingdonor/addingdonor.component';
import { ComponentType } from '@angular/cdk/portal';
import { AddingpatientComponent } from '../user/addingpatient/addingpatient.component';

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
  totalRecipients!: number;
  chartData: Blood[] = [];
  labeldata: string[] = [];
  realdata: number[] = [];
  colordata: string[] = [];

  constructor(
    private bankService: BloodBankService,
    private _location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.bankService.bloodbank.subscribe((item: BloodBank) => {
      this.bloodbank = item;
      this.totalDonors = item.donors ? item.donors.length : 0;
      this.totalRecipients = item.recipients ? item.recipients.length : 0;
      this.chartData = [
        {
          bloodGroup: 'A+',
          bloodStock: item.bloodInventory ? item.bloodInventory.a1 : 0,
        },
        {
          bloodGroup: 'A-',
          bloodStock: item.bloodInventory ? item.bloodInventory.a2 : 0,
        },
        {
          bloodGroup: 'B+',
          bloodStock: item.bloodInventory ? item.bloodInventory.b1 : 0,
        },
        {
          bloodGroup: 'B-',
          bloodStock: item.bloodInventory ? item.bloodInventory.b2 : 0,
        },
        {
          bloodGroup: 'AB+',
          bloodStock: item.bloodInventory ? item.bloodInventory.aB1 : 0,
        },
        {
          bloodGroup: 'AB-',
          bloodStock: item.bloodInventory ? item.bloodInventory.aB2 : 0,
        },
        {
          bloodGroup: 'O+',
          bloodStock: item.bloodInventory ? item.bloodInventory.o1 : 0,
        },
        {
          bloodGroup: 'O-',
          bloodStock: item.bloodInventory ? item.bloodInventory.o2 : 0,
        },
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
    this.OpenPopup(this.bloodbank, AddingdonorComponent);
  }

  addRequest() {
    this.OpenPopup(this.bloodbank, AddingpatientComponent);
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

  OpenPopup(selectedBloodBank: BloodBank, component: ComponentType<unknown>) {
    var _popup = this.dialog.open(component, {
      width: '60%',
      height: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        selectedBloodBank: selectedBloodBank,
      },
    });
    _popup.afterClosed().subscribe((item) => {
      console.log(item);
    });
  }
}
