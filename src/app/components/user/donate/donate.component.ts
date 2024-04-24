import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DonateService } from '../../../services/donate.service';
import { DonorService } from '../../../services/donor.service';
import { Donor } from '../../../models/donor';
import { Blood } from '../../../models/Blood';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../popup/popup.component';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-donate',
  standalone: true,
  imports: [FormsModule, CommonModule, MaterialModule],
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css',
})
export class DonateComponent implements OnInit {
  constructor(
    private donateService: DonateService,
    private donorService: DonorService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.reloadData();
  }

  selectedDonor: Donor = {
    donorId: '',
    donorName: '',
    donorBloodType: '',
    donorAddress: '',
    donorAge: 0,
    donorContactNumber: '',
    donorGender: '',
  };

  donors: Donor[] | undefined;
  bloodStocks: Observable<Blood[]> | undefined;
  bloodStock: Blood = {
    bloodGroup: '',
    bloodStock: 0,
  };
  dataSourse:any
  displayedColumns:string[]=[ "donorId",
  "donorName",
  "donorBloodType",
  "donorContactNumber",
  "donorGender",
  "donorAge",
  "donorAddress",
"action"]
@ViewChild(MatPaginator) paginator!:MatPaginator
@ViewChild(MatSort) sort!:MatSort

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.donateService
        .getBloodListById(this.selectedDonor.donorBloodType)
        .subscribe((res: Blood) => {
          console.log(res);
          res.bloodStock = res.bloodStock + 1;

          this.donateService.addBlood(res).subscribe(() => {
            this.reloadData();
            this.selectedDonor = {
              donorId: '',
              donorName: '',
              donorBloodType: '',
              donorGender: '',
              donorContactNumber: '',
              donorAge: 0,
              donorAddress: '',
            };
            this.bloodStock = {
              bloodGroup: '',
              bloodStock: 0,
            };
          });
        });

      // this.bloodStock.bloodStock = this.bloodStock.bloodStock + 1;
      // Process form data (e.g., save donor information)

      // console.log('Form submitted!', this.selectedDonor);
      // Clear form fields after submission
      form.reset();
      this.bloodStocks = this.donateService.getBloodList();
    }
  }

  reloadData() {
     this.donorService.getDonorList().subscribe((res:Donor[])=>{
      this.donors = res;
      this.dataSourse = new MatTableDataSource<Donor>(res);
      this.dataSourse.paginator = this.paginator
      this.dataSourse.sort = this.sort
    });
    
    this.bloodStocks = this.donateService.getBloodList();
  }

  donateDonor(donor: Donor) {
    this.selectedDonor = { ...donor };
    this.OpenPopup(donor, 'Comfirm Donation')
    
  }

  filterChange(data:Event){
    const value = (data.target as HTMLInputElement).value
    this.dataSourse.filter = value
  }

  OpenPopup(selectedDonor:any, title:any){
    var _popup=this.dialog.open(PopupComponent,{
      width:'60%',
      height: '400px',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration:'1000ms',
      data:{
        title:title,
        selectedDonor: selectedDonor
      }
    })
    _popup.afterClosed().subscribe(item=>{
      console.log(item);
      this.reloadData()
    })
  }
}
