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
import { EmployeeListComponent } from './components/user/employee-list/employee-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { BloodBanksComponent } from './components/blood-banks/blood-banks.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
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
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'nav', component: NavbarComponent },
  {
    path: 'userprofile',
    component: UserprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'blood-banks',
    component: BloodBanksComponent,
    canActivate: [AuthGuard],
  },
];
