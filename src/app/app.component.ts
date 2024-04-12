import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AddingdonorComponent } from './addingdonor/addingdonor.component';
import { SplashComponent } from './splash/splash.component';
import { CommonModule } from '@angular/common';
import { AppInitializerService } from './app-initializer.service';

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
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private appInitializerService: AppInitializerService
  ) {}
  appLoaded = false;
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
}
