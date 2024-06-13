import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.Module';
import { Router, RouterModule } from '@angular/router';
import { LoadingspinnerComponent } from '../loadingspinner/loadingspinner.component';
import { AccountService } from '../../services/account.service';
import { RoleAccess, userinfo } from '../../models/Employee';
import { Store } from '@ngrx/store';
import { getMenuByRole, getProfileUrl } from '../../_store/user/user.selector';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { fetchMenu } from '../../_store/user/user.actions';
import {
  clearNotification,
  loadSpinner,
} from '../../_store/Globel/globel.actions';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from '../footer/footer.component';
import { getNotificationList } from '../../_store/Globel/globel.selector';
import { Notification } from '../../models/Notification';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menubar',
  standalone: true,
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css',
  imports: [
    MaterialModule,
    RouterModule,
    LoadingspinnerComponent,
    MatCommonModule,
    CommonModule,
    FlexLayoutModule,
    FooterComponent,
  ],
})
export class MenubarComponent implements DoCheck, OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store,
    private authService: AccountService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }

    authService.isAdmin.subscribe((res) => {
      this.isAdmin = res;
    });

    this.authService.currentUser.subscribe((data) => {
      if (data !== null) {
        this.userInfo = data;
        if (this.userInfo != null) {
          this.profileUrl = this.userInfo.filePath;
          this.username = this.userInfo.email;
        }
      } else {
        this.userInfo = this.authService.getUserDataFromStorage();
        this.profileUrl = this.userInfo.filePath;
        this.username = this.userInfo.email;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit(): void {
    if (localStorage.getItem('userdata') != null) {
      let jsonString = localStorage.getItem('userdata') as string;
      let _obj = JSON.parse(jsonString) as userinfo;
      this.store.dispatch(loadSpinner({ isLoaded: true }));
      this.store.dispatch(fetchMenu({ userrole: _obj.role }));
    }
    this.store.select(getMenuByRole).subscribe((item) => {
      this.menulist = item;
    });
    this.store.select(getProfileUrl).subscribe((item) => {
      if (item !== '') {
        this.profileUrl = item;
      }
    });
    this.subscription = this.store
      .select(getNotificationList)
      .subscribe((item) => {
        this.notifications = item;
        this.notificationCount = this.notifications.length;
        this.badgevisible = this.notifications.length > 0 ? true : false;
      });
  }
  ngDoCheck(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/login' || currentRoute === '/register') {
      this.isMenuVisible = false;
    } else {
      this.isMenuVisible = true;
    }
  }

  badgevisible: boolean = false;
  profileUrl: string | undefined;
  isAdmin: boolean = false;
  title = 'JeevanRakt.UI';
  username: string | null = null;
  isMenuVisible: boolean = false;
  menulist!: RoleAccess[];
  showNotifications: boolean = false;
  notifications: Notification[] = [];
  userInfo: userinfo | null = null;
  subscription: Subscription | undefined;
  notificationCount: number = 0;

  onHome() {
    this.router.navigate(['home']);
  }

  onAbout() {
    this.router.navigate(['about']);
  }

  logout() {
    this.authService.logOut();
  }

  badgeVisibility() {
    this.badgevisible = !this.badgevisible;
  }

  onProfile() {
    // Navigate to Profile
    this.router.navigate(['/profile']);
  }

  onSettings() {
    // Navigate to Settings
  }

  clearNotification() {
    this.store.dispatch(clearNotification());
  }

  login() {
    this.router.navigate(['login']);
  }

  registor() {
    this.router.navigate(['register']);
  }

  addbloodbank() {
    this.router.navigate(['addbloodbank']);
  }
}
