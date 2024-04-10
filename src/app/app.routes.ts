import { Routes } from '@angular/router';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { AddingpatientComponent } from './addingpatient/addingpatient.component';
import { HomeComponent } from './home/home.component';
import { RecipientListComponent } from './recipient-list/recipient-list.component';
import { DonateComponent } from './donate/donate.component';
import { BloodStockComponent } from './blood-stock/blood-stock.component';

export const routes: Routes = [
  { path: 'add-donor', component: AddingdonorComponent },
  { path: 'donor-list', component: DonorListComponent },
  { path: 'add-recipient', component: AddingpatientComponent },
  { path: '', component: HomeComponent },
  { path: 'recipient-list', component: RecipientListComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'bloodstock', component: BloodStockComponent },
];
