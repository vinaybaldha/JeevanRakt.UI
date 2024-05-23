import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './_module/Material.Module';
import { LoadingspinnerComponent } from './components/loadingspinner/loadingspinner.component';
import { MenubarComponent } from './components/menubar/menubar.component';
import { SignalrService } from './signalr.service';
import { userinfo } from './models/Employee';
import { AccountService } from './services/account.service';
import { Store } from '@ngrx/store';
import { loadBloodBankById } from './_store/blood-bank/bloodbank.actions';
import { getBloodBank } from './_store/blood-bank/bloodbank.selector';
import { loadInventory } from './_store/bloodInventory/bloodInventory.actions';

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
    MenubarComponent,
  ],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private singlarService: SignalrService,
    private authService: AccountService,
    private store: Store
  ) {
    this.singlarService.startConnection();
    this.singlarService.addProductListener();
  }
}
