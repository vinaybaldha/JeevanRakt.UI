import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './components/user/home/home.component';
import { AddingdonorComponent } from './components/user/addingdonor/addingdonor.component';
import { DonorListComponent } from './components/user/donor-list/donor-list.component';
import { AddingpatientComponent } from './components/user/addingpatient/addingpatient.component';
import { RecipientListComponent } from './components/user/recipient-list/recipient-list.component';
import { BloodStockComponent } from './components/user/blood-stock/blood-stock.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { BloodTransfertComponent } from './components/user/blood-transfert/blood-transfert.component';
import { DonateComponent } from './components/user/donate/donate.component';
import { AuthGuard } from './services/auth.guard';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { EmployeeListComponent } from './components/user/employee-list/employee-list.component';

export const routes: Routes = [
  { path: '', component: AppComponent, canActivate: [AuthGuard] },
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
