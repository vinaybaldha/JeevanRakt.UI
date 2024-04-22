import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInitializerService } from './services/app-initializer.service';
import { AccountService } from './services/account.service';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Employee } from './models/Employee';
import { CarouselModule } from '@syncfusion/ej2-angular-navigations';
import {MatBadgeModule} from '@angular/material/badge';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  imports: [
    RouterOutlet,
    RouterModule,
    SplashComponent,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    LoginComponent,
    NavbarComponent,
    MatBadgeModule
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private appInitializerService: AppInitializerService,
    private authService: AccountService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }

    authService.isAdmin.subscribe((res) => {
      this.isAdmin = res;
    });

    authService.user.subscribe((res) => {
      this.profileUrl = res?.filePath;
    });

    this.authService.currentUser.subscribe((res) => {
      this.username = res;
    });
  }
  appLoaded = false;
  opened: boolean = false;
  badgevisible:boolean= false

  isAdmin: boolean = false;
  title = 'JeevanRakt.UI';
  username: string | null = null;
  profileUrl: string | undefined;

  isLogin: boolean = false;
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

  badgeVisibility(){
    this.badgevisible = !this.badgevisible
  }
}
