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
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'add-donor',
    component: AddingdonorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'donor-list',
    component: DonorListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-recipient',
    component: AddingpatientComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'recipient-list',
    component: RecipientListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'donate', component: DonateComponent, canActivate: [AuthGuard] },
  {
    path: 'bloodstock',
    component: BloodStockComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blood-transfert',
    component: BloodTransfertComponent,
    canActivate: [AuthGuard],
  },
];
