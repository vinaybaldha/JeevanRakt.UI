import { Routes } from '@angular/router';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';
import { DonorListComponent } from './donor-list/donor-list.component';
import { AddingpatientComponent } from './addingpatient/addingpatient.component';
import { HomeComponent } from './home/home.component';
import { RecipientListComponent } from './recipient-list/recipient-list.component';
import { DonateComponent } from './donate/donate.component';
import { BloodStockComponent } from './blood-stock/blood-stock.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BloodTransfertComponent } from './blood-transfert/blood-transfert.component';

export const routes: Routes = [
  { path: 'add-donor', component: AddingdonorComponent },
  { path: 'donor-list', component: DonorListComponent },
  { path: 'add-recipient', component: AddingpatientComponent },
  { path: '', component: HomeComponent },
  { path: 'recipient-list', component: RecipientListComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'bloodstock', component: BloodStockComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blood-transfert', component: BloodTransfertComponent}
];
