import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './_module/Material.Module';
import { LoadingspinnerComponent } from "./components/loadingspinner/loadingspinner.component";
import { MenubarComponent } from "./components/menubar/menubar.component";
import { SignalrService } from './signalr.service';

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
        MaterialModule,
        LoadingspinnerComponent,
        MenubarComponent
    ]
})
export class AppComponent {
  // constructor(
  //   private router: Router,
  //   private appInitializerService: AppInitializerService,
  //   private authService: AccountService
  // ) {
  //   if (!this.authService.isAuthenticated()) {
  //     this.router.navigate(['/login']); // Redirect to login if not authenticated
  //   }

  //   authService.isAdmin.subscribe((res) => {
  //     this.isAdmin = res;
  //   });

  //   authService.user.subscribe((res) => {
  //     this.profileUrl = res?.filePath;
  //   });

  //   this.authService.currentUser.subscribe((res) => {
  //     this.username = res;
  //   });
  // }
  // appLoaded = false;
  // opened: boolean = false;
  // badgevisible:boolean= false

  // isAdmin: boolean = false;
  // title = 'JeevanRakt.UI';
  // username: string | null = null;
  // profileUrl: string | undefined;

  // isLogin: boolean = false;
  // navigateToAddDonor() {
  //   this.router.navigateByUrl('/add-donor');
  // }

  // ngOnInit(): void {
  //   this.initializeApp();
  // }

  constructor(private singlarService:SignalrService) {
    this.singlarService.startConnection();
    this.singlarService.addProductListener();  
  }

}
