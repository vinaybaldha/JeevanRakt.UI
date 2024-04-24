import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppInitializerService } from './services/app-initializer.service';
import { AccountService } from './services/account.service';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './_module/Material.Module';

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
    LoginComponent,
    MaterialModule
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
