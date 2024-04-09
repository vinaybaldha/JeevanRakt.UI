import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, AddingdonorComponent, RouterModule],
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'JeevanRakt.UI';
  navigateToAddDonor() {
    this.router.navigateByUrl('/add-donor');
  }
}
