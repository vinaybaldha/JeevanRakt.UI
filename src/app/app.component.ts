import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';
import { SplashComponent } from './splash/splash.component';
import { CommonModule } from '@angular/common';
import { AppInitializerService } from './app-initializer.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    AddingdonorComponent,
    RouterModule,
    SplashComponent,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private appInitializerService: AppInitializerService,
    private authService: AccountService
  ) {}
  appLoaded = false;
  opened: boolean = false;
  isLogin: boolean = !!this.authService.getCurrentUser;
  title = 'JeevanRakt.UI';
  navigateToAddDonor() {
    this.router.navigateByUrl('/add-donor');
  }
  ngOnInit(): void {
    this.initializeApp();
  }

  private initializeApp(): void {
    this.appInitializerService.initializeApp().then(() => {
      // Set appLoaded to true once initialization is complete
      this.appLoaded = true;
    });
  }

  onHome() {
    this.router.navigate(['home']);
  }

  logout() {
    this.authService.logOut();
  }
}
