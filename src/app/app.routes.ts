import { Routes } from '@angular/router';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';
import { DonorListComponent } from './donor-list/donor-list.component';

export const routes: Routes = [
  { path: 'addDonor', component: AddingdonorComponent },
  { path: 'donor-list', component: DonorListComponent },
];
