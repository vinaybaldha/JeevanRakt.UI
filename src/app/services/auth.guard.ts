import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AccountService, private router: Router) {
    this.authService.currentUser.subscribe((res) => {
      this.username = res;
    });
  }
  username: string | null = null;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (this.username) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
