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
import { UserSidebarComponent } from './sidebar/user-sidebar/user-sidebar.component';
import { AdminSidebarComponent } from './sidebar/admin-sidebar/admin-sidebar.component';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './components/user/user.component';

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
    UserSidebarComponent,
    AdminSidebarComponent,
    LoginComponent,
    UserComponent,
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
    console.log(this.isAdmin);
    console.log(this.isLogin);
  }
  appLoaded = false;
  opened: boolean = false;
  isLogin: boolean = !!this.authService.getCurrentUser;
  isAdmin: boolean = false;
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
