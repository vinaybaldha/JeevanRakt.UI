import { Routes } from '@angular/router';
import { HomeComponent } from './components/user/home/home.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'adddonor',
    loadComponent: () =>
      import('./components/user/addingdonor/addingdonor.component').then(
        (m) => m.AddingdonorComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'donorlist',
    loadComponent: () =>
      import('./components/user/donor-list/donor-list.component').then(
        (m) => m.DonorListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'addrecipient',
    loadComponent: () =>
      import('./components/user/addingpatient/addingpatient.component').then(
        (m) => m.AddingpatientComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'recipientlist',
    loadComponent: () =>
      import('./components/user/recipient-list/recipient-list.component').then(
        (m) => m.RecipientListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'donateblood',
    loadComponent: () =>
      import('./components/user/donate/donate.component').then(
        (m) => m.DonateComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'bloodstock',
    loadComponent: () =>
      import('./components/user/blood-stock/blood-stock.component').then(
        (m) => m.BloodStockComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'employeelist',
    loadComponent: () =>
      import('./components/user/employee-list/employee-list.component').then(
        (m) => m.EmployeeListComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/user/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'bloodtransfert',
    loadComponent: () =>
      import(
        './components/user/blood-transfert/blood-transfert.component'
      ).then((m) => m.BloodTransfertComponent),
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./components/forgot-password/forgot-password.component').then(
        (m) => m.ForgotPasswordComponent
      ),
  },
  {
    path: 'reset-password',
    loadComponent: () =>
      import('./components/reset-password/reset-password.component').then(
        (m) => m.ResetPasswordComponent
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/user/userprofile/userprofile.component').then(
        (m) => m.UserprofileComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'bloodbank',
    loadComponent: () =>
      import('./components/blood-banks/blood-banks.component').then(
        (m) => m.BloodBanksComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import(
        './components/user/employee-list/employee-register/employee-register.component'
      ).then((m) => m.EmployeeRegisterComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./components/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
  {
    path: 'ubloodbank',
    loadComponent: () =>
      import('./components/bloodbank/bloodbank.component').then(
        (m) => m.BloodbankComponent
      ),
  },
  {
    path: 'yourbloodbank',
    loadComponent: () =>
      import('./components/manager/yourbloodbank/yourbloodbank.component').then(
        (m) => m.YourbloodbankComponent
      ),
  },
  {
    path: 'success',
    loadComponent: () =>
      import('./components/success/success.component').then(
        (m) => m.SuccessComponent
      ),
  },
  {
    path: 'fail',
    loadComponent: () =>
      import('./components/fail/fail.component').then((m) => m.FailComponent),
  },
  {
    path: 'blood-requests',
    loadComponent: () =>
      import('./components/user/blood-requests/blood-requests.component').then(
        (m) => m.BloodRequestsComponent
      ),
  },
];
