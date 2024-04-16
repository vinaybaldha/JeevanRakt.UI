import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminSidebarComponent } from '../../sidebar/admin-sidebar/admin-sidebar.component';
import { UserSidebarComponent } from '../../sidebar/user-sidebar/user-sidebar.component';
import { Router } from '@angular/router';
import { AppInitializerService } from '../../services/app-initializer.service';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    UserSidebarComponent,
    AdminSidebarComponent,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  constructor(
    private router: Router,
    private appInitializerService: AppInitializerService,
    private authService: AccountService
  ) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
    }
  }

  appLoaded = false;
  opened: boolean = false;
  isLogin: boolean = !!this.authService.getCurrentUser;
  isAdmin: boolean = false;
  title = 'JeevanRakt.UI';

  onHome() {
    this.router.navigate(['home']);
  }

  logout() {
    this.authService.logOut();
  }
}
