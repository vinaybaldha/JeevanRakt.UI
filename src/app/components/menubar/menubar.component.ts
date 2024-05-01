import { Component, DoCheck, OnInit } from '@angular/core';
import { MaterialModule } from '../../_module/Material.Module';
import { Router, RouterModule } from '@angular/router';
import { LoadingspinnerComponent } from "../loadingspinner/loadingspinner.component";
import { AccountService } from '../../services/account.service';
import { RoleAccess, userinfo } from '../../models/Employee';
import { Store } from '@ngrx/store';
import { getMenuByRole } from '../../_store/user/user.selector';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { fetchMenu } from '../../_store/user/user.actions';

@Component({
    selector: 'app-menubar',
    standalone: true,
    templateUrl: './menubar.component.html',
    styleUrl: './menubar.component.css',
    imports: [MaterialModule, RouterModule, LoadingspinnerComponent, MatCommonModule, CommonModule]
})
export class MenubarComponent implements DoCheck, OnInit{

  constructor( private router: Router,
    private store: Store,
    private authService: AccountService) {
      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']); // Redirect to login if not authenticated
      }
  
      authService.isAdmin.subscribe((res) => {
        this.isAdmin = res;
      });
  
      this.userInfo = this.authService.getUserDataFromStorage()
      this.profileUrl = this.userInfo.filePath
      this.username = this.userInfo.email
  }
  ngOnInit(): void {
    if (localStorage.getItem('userdata') != null) {
      let jsonString = localStorage.getItem('userdata') as string;
      let _obj = JSON.parse(jsonString) as userinfo;
      this.store.dispatch(fetchMenu({userrole: _obj.role}))
    }
    this.store.select(getMenuByRole).subscribe((item)=>{
      this.menulist = item
    })
  }
  ngDoCheck(): void {
    const currentRoute = this.router.url
    if(currentRoute === '/login' || currentRoute === '/register'){
      this.isMenuVisible = false
    }else{
      this.isMenuVisible = true
    }
  }

  badgevisible:boolean= false
  profileUrl: string | undefined;
  isAdmin: boolean = false;
  title = 'JeevanRakt.UI';
  username: string | null = null;
  isMenuVisible:boolean = false
  menulist!:RoleAccess[]
  userInfo: userinfo = {
    employeeName: '',
    email: '',
    phoneNumber: '',
    token: '',
    filePath: '',
    role:''
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
