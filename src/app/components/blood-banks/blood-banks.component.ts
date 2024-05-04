import { Component } from '@angular/core';
import { BloodBankService } from '../../services/blood-bank.service';
import { BloodBank } from '../../models/BloodBank';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { loadBloodBank } from '../../_store/blood-bank/bloodbank.actions';
import { getBloodBankList } from '../../_store/blood-bank/bloodbank.selector';
import { MaterialModule } from '../../_module/Material.Module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blood-banks',
  standalone: true,
  imports: [CommonModule, MatCardModule, MaterialModule],
  templateUrl: './blood-banks.component.html',
  styleUrl: './blood-banks.component.css',
})
export class BloodBanksComponent {
  bloodBanks: BloodBank[] = [];
  bloodbank!: BloodBank
  visible:boolean = false

  constructor(private store:Store, private bankService: BloodBankService, private router: Router) {}

  ngOnInit(): void {
    this.loadBloodBanks();
  }

  loadBloodBanks(): void {
    this.store.dispatch(loadBloodBank())
    this.store.select(getBloodBankList).subscribe(item=>{
      this.bloodBanks = item
    })
  }

  getLocationService():Promise<any>{
    return new Promise((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(resp=>{
        resolve({lng:resp.coords.longitude,lat:resp.coords.latitude})
      })
    })
   
  }

  getLocation(){
    this.getLocationService().then((resp)=>{
      console.log(resp);
      this.bankService.getNearestBloodBank(resp.lat,resp.lng).subscribe((resp)=>{
        this.bloodbank = resp
        this.visible = true
      })
    })
  }

  onBank(bank:BloodBank){
    this.bankService.bloodbankasSubject.next(bank)
    this.router.navigate(['ubloodbank'])
  }
}
